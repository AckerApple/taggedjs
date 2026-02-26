import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const ROOT = process.cwd()
const TARGET_DIRS = ['src', 'todo/src']
const TARGET_EXT = new Set(['.ts'])
const NON_ELEMENT_IMPORTS = new Set([
  'tag', 'state', 'states', 'subscribe', 'watch', 'pipe', 'provider', 'hmr', 'tagElement', 'htmlTag',
  'noElement', 'Subject', 'ValueSubject', 'toSubject', 'toValueSubject', 'destroy', 'onDestroy', 'inCycle',
  'inCycleContext', 'emit', 'once', 'nextTick', 'isTag', 'isSupport', 'route', 'router', 'history', 'location',
  'inputEvent', 'keyEvent', 'mouseEvent', 'focusEvent', 'blurEvent', 'changeEvent', 'html', 'css', 'svg'
])

function listFiles(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...listFiles(full))
      continue
    }
    if (!TARGET_EXT.has(path.extname(entry.name))) continue
    if (entry.name.endsWith('.d.ts')) continue
    out.push(full)
  }
  return out
}

function isIdentifierName(name) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name)
}

function getLiteralPropName(nameNode, sourceText) {
  if (ts.isIdentifier(nameNode) || ts.isPrivateIdentifier(nameNode)) return nameNode.text
  if (ts.isStringLiteralLike(nameNode) || ts.isNumericLiteral(nameNode)) return nameNode.text
  if (ts.isComputedPropertyName(nameNode) && ts.isStringLiteralLike(nameNode.expression)) return nameNode.expression.text
  return sourceText.slice(nameNode.getStart(), nameNode.getEnd())
}

function getRootIdentifier(expr) {
  if (ts.isIdentifier(expr)) return expr.text
  if (ts.isPropertyAccessExpression(expr)) return getRootIdentifier(expr.expression)
  if (ts.isElementAccessExpression(expr)) return getRootIdentifier(expr.expression)
  if (ts.isParenthesizedExpression(expr)) return getRootIdentifier(expr.expression)
  return null
}

function collectElementNames(sourceFile) {
  const elementNames = new Set()

  for (const stmt of sourceFile.statements) {
    if (ts.isImportDeclaration(stmt) && stmt.importClause?.namedBindings && ts.isNamedImports(stmt.importClause.namedBindings)) {
      const moduleName = ts.isStringLiteral(stmt.moduleSpecifier) ? stmt.moduleSpecifier.text : ''
      if (moduleName !== 'taggedjs') continue

      for (const spec of stmt.importClause.namedBindings.elements) {
        const imported = (spec.propertyName ?? spec.name).text
        const local = spec.name.text
        if (NON_ELEMENT_IMPORTS.has(imported)) continue
        if (/^[a-z]/.test(local)) {
          elementNames.add(local)
        }
      }
    }

    if (!ts.isVariableStatement(stmt)) continue
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer) continue
      if (!ts.isCallExpression(decl.initializer)) continue

      const callee = decl.initializer.expression
      if (ts.isIdentifier(callee) && callee.text === 'htmlTag') {
        elementNames.add(decl.name.text)
      }
      if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.name) && callee.name.text === 'htmlTag') {
        elementNames.add(decl.name.text)
      }
    }
  }

  return elementNames
}

function buildAttrChain(obj, text) {
  const parts = []
  for (const prop of obj.properties) {
    if (ts.isSpreadAssignment(prop) || ts.isMethodDeclaration(prop) || ts.isGetAccessorDeclaration(prop) || ts.isSetAccessorDeclaration(prop)) {
      return null
    }

    if (ts.isPropertyAssignment(prop)) {
      const name = getLiteralPropName(prop.name, text)
      const valueNode = prop.initializer
      const valueText = text.slice(valueNode.getStart(), valueNode.getEnd())
      const accessor = isIdentifierName(name) ? `.${name}` : `[${JSON.stringify(name)}]`

      if (ts.isStringLiteral(valueNode) && !valueNode.text.includes('`') && !valueNode.text.includes('${')) {
        const escaped = valueNode.text.replace(/`/g, '\\`')
        parts.push(`${accessor}\`${escaped}\``)
      } else {
        parts.push(`${accessor}(${valueText})`)
      }
      continue
    }

    if (ts.isShorthandPropertyAssignment(prop)) {
      const name = prop.name.text
      const accessor = isIdentifierName(name) ? `.${name}` : `[${JSON.stringify(name)}]`
      parts.push(`${accessor}(${name})`)
      continue
    }

    return null
  }

  return parts.join('')
}

function migrateFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const sourceFile = ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const elementNames = collectElementNames(sourceFile)
  if (!elementNames.size) return false

  const edits = []

  function visit(node) {
    if (ts.isCallExpression(node) && node.arguments.length > 0 && ts.isObjectLiteralExpression(node.arguments[0])) {
      const root = getRootIdentifier(node.expression)
      if (root && elementNames.has(root)) {
        const attrObj = node.arguments[0]
        const chain = buildAttrChain(attrObj, text)
        if (chain) {
          const calleeText = text.slice(node.expression.getStart(), node.expression.getEnd())
          const restArgs = node.arguments.slice(1).map(arg => text.slice(arg.getStart(), arg.getEnd())).join(', ')
          const replacement = `${calleeText}${chain}(${restArgs})`
          edits.push({ start: node.getStart(), end: node.getEnd(), replacement })
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  if (!edits.length) return false
  edits.sort((a, b) => b.start - a.start)

  let updated = text
  for (const edit of edits) {
    updated = updated.slice(0, edit.start) + edit.replacement + updated.slice(edit.end)
  }

  if (updated !== text) {
    fs.writeFileSync(filePath, updated)
    return true
  }

  return false
}

let changed = 0
for (const relDir of TARGET_DIRS) {
  const absDir = path.join(ROOT, relDir)
  if (!fs.existsSync(absDir)) continue
  for (const file of listFiles(absDir)) {
    if (migrateFile(file)) changed += 1
  }
}

console.log(`migrated files: ${changed}`)
