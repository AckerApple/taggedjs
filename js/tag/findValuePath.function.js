export function findValuePath(target, data, path = [], maxDepth = 5) {
    if (path.length > maxDepth) {
        return undefined;
    }
    if (data === target) {
        return path;
    }
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            const result = findValuePath(target, data[i], [...path, i], maxDepth);
            if (result)
                return result;
        }
    }
    else if (data && typeof data === 'object') {
        for (const key of Object.keys(data)) {
            const result = findValuePath(target, data[key], [...path, key], maxDepth);
            if (result)
                return result;
        }
    }
    return undefined;
}
//# sourceMappingURL=findValuePath.function.js.map