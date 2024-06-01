module.exports.ResolveTsForJsPlugin = class ResolveTsForJsPlugin {
  apply(compiler) {
    // Access the normal module factory
    compiler.hooks.normalModuleFactory.tap("ResolveTsForJsPlugin", (nmf) => {
      nmf.hooks.beforeResolve.tapAsync("ResolveTsForJsPlugin", (resolveData, callback) => {
        if (!resolveData) return callback();

        // Check if the request ends with '.js'
        if (resolveData.request.endsWith('.js')) {
          // Change the request from .js to .ts without returning it
          resolveData.request = resolveData.request.replace(/\.js$/, '.ts');
        }

        // Continue the process without returning the object
        callback();
      });
    });
  }
}
