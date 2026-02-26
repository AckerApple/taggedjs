import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const ROOT = process.cwd()
const TARGET_DIRS = ['src', 'todo/src']

const NON_ELEMENT_IMPORTS = new Set([
  'tag','state','states','subscribe','watch','pipe','provider','hmr','tagElement','htmlTag',
  'noElement','Subject','ValueSubject','toSubject','toValueSubject','destroy','onDestroy','inCycle',
  'inCycleContext','emit','once','nextTick','isTag','isSupport','route','router','history','location',
  'InputElementTargetEvent','ElementFunction','TagJsComponent','CombinedElementFunctions','host','output',
  'callbackMaker','callback','subject','array','signal','getContextInCycle'
])

function listTsFiles(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...listTsFiles(full))
      continue
    }
    if (!entry.name.endsWith('.ts') || entry.name.endsWith('.d.ts')) continue
    out.push(full)
  }
  return out
}

function getRootIdentifier(expr) {
  if (ts.isIdentifier(expr)) return expr.text
  if (ts.isPropertyAccessExpression(expr)) return getRootIdentifier(expr.expression)
  if (ts.isElementAccessExpression(expr)) return getRootIdentifier(expr.expression)
  if (ts.isParenthesizedExpression(expr)) return getRootIdentifier(expr.expression)
  return null
}

function isIdentifierName(name) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name)
}

function getPropName(nameNode, src) {
  if (ts.isIdentifier(nameNode) || ts.isPrivateIdentifier(nameNode)) return nameNode.text
  if (ts.isStringLiteralLike(nameNode) || ts.isNumericLiteral(nameNode)) return nameNode.text
  if (ts.isComputedPropertyName(nameNode) && ts.isStringLiteralLike(nameNode.expression)) return nameNode.expression.text
  return src.slice(nameNode.getStart(), nameNode.getEnd())
}

function collectElementNames(sf) {
  const names = new Set()

  for (const stmt of sf.statements) {
    if (ts.isImportDeclaration(stmt) && stmt.importClause?.namedBindings && ts.isNamedImports(stmt.importClause.namedBindings)) {
      const moduleName = ts.isStringLiteral(stmt.moduleSpecifier) ? stmt.moduleSpecifier.text : ''
      if (moduleName !== 'taggedjs') continue
      for (const spec of stmt.importClause.namedBindings.elements) {
        const imported = (spec.propertyName ?? spec.name).text
        const local = spec.name.text
        if (NON_ELEMENT_IMPORTS.has(imported)) continue
        if (/^[a-z]/.test(local)) names.add(local)
      }
    }

    if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name) || !decl.initializer) continue
        if (!ts.isCallExpression(decl.initializer)) continue
        const callee = decl.initializer.expression
        if (ts.isIdentifier(callee) && callee.text === 'htmlTag') names.add(decl.name.text)
        if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.name) && callee.name.text === 'htmlTag') {
          names.add(decl.name.text)
        }
      }
    }
  }

  return names
}

function buildChain(obj, src) {
  const parts = []

  for (const prop of obj.properties) {
    if (ts.isSpreadAssignment(prop) || ts.isMethodDeclaration(prop) || ts.isGetAccessorDeclaration(prop) || ts.isSetAccessorDeclaration(prop)) {
      return null
    }

    if (ts.isShorthandPropertyAssignment(prop)) {
      const n = prop.name.text
      parts.push(`.${n}(${n})`)
      continue
    }

    if (!ts.isPropertyAssignment(prop)) return null

    const name = getPropName(prop.name, src)
    const valueNode = prop.initializer
    const valueText = src.slice(valueNode.getStart(), valueNode.getEnd())

    // For dotted/hyphen/space attribute names, prefer attr(name, value)
    if (name.includes('.') || name.includes('-') || name.includes(':') || name.includes(' ')) {
      parts.push(`.attr(${JSON.stringify(name)}, ${valueText})`)
      continue
    }

    const accessor = isIdentifierName(name) ? `.${name}` : `[${JSON.stringify(name)}]`

    if (ts.isStringLiteral(valueNode) && !valueNode.text.includes('`') && !valueNode.text.includes('${')) {
      parts.push(`${accessor}\`${valueNode.text.replace(/`/g, '\\`')}\``)
    } else {
      parts.push(`${accessor}(${valueText})`)
    }
  }

  return parts.join('')
}

function migrateOne(filePath) {
  let text = fs.readFileSync(filePath, 'utf8')
  let changed = 0

  while (true) {
    const sf = ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
    if ((sf.parseDiagnostics || []).length) {
      return { changed: false, edits: changed, parseBlocked: true }
    }

    const elementNames = collectElementNames(sf)
    let target = null

    function visit(node) {
      if (target) return
      if (ts.isCallExpression(node) && node.arguments.length > 0 && ts.isObjectLiteralExpression(node.arguments[0])) {
        const root = getRootIdentifier(node.expression)
        if (root && elementNames.has(root)) {
          const chain = buildChain(node.arguments[0], text)
          if (chain) {
            target = { node, chain }
            return
          }
        }
      }
      ts.forEachChild(node, visit)
    }

    visit(sf)
    if (!target) break

    const node = target.node
    const calleeText = text.slice(node.expression.getStart(), node.expression.getEnd())
    const rest = node.arguments.slice(1).map(a => text.slice(a.getStart(), a.getEnd())).join(', ')
    const replacement = `${calleeText}${target.chain}(${rest})`

    text = text.slice(0, node.getStart()) + replacement + text.slice(node.getEnd())
    changed++
  }

  if (changed) fs.writeFileSync(filePath, text)
  return { changed: changed > 0, edits: changed, parseBlocked: false }
}

let filesChanged = 0
let editCount = 0
const parseBlocked = []

for (const rel of TARGET_DIRS) {
  const dir = path.join(ROOT, rel)
  if (!fs.existsSync(dir)) continue
  for (const file of listTsFiles(dir)) {
    const res = migrateOne(file)
    if (res.parseBlocked) {
      parseBlocked.push(path.relative(ROOT, file))
      continue
    }
    if (res.changed) {
      filesChanged++
      editCount += res.edits
    }
  }
}

console.log(`files_changed=${filesChanged}`)
console.log(`edits=${editCount}`)
if (parseBlocked.length) {
  console.log('parse_blocked:')
  for (const f of parseBlocked) console.log(f)
}
