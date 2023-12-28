function useScript(req, res, next) {
  // Check if the response is an HTML file
  if (res.getHeader('Content-Type') && res.getHeader('Content-Type').includes('text/html')) {
    // Use the send module to read and modify the HTML content
    send(req, req.path, { root: staticDir })
      .on('file', (file) => {
        // Read and modify the file content
        let content = file.pipe(res)
        content = content.toString()

        // Inject your script into the HTML content
        const injectedScript = '<script src="/your-script.js"></script>'
        content = content.replace('</body>', `${injectedScript}</body>`)

        // Send the modified content to the client
        res.send(content)
      })
      .on('end', () => next())
  } else {
    // Continue to the next middleware if the file is not an HTML file
    next()
  }
}
