const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const index = path.join(__dirname, 'index.html')
const indexString = fs.readFileSync(index).toString()

const inject = path.join(__dirname, 'tagged-hmr-script.js')
const customScript = '<script type="module">'+ fs.readFileSync(inject).toString() +'</script>'
const watchPath = process.env.dir ? path.join(__dirname, process.env.dir) : __dirname

const bundleScript = require('./bundleScript.js')

// Custom middleware for serving static files
app.use((req, res, next) => {
  const filePath = path.join(__dirname, req.url)

  // Check if the requested file is an HTML file
  const customScriptInjection = path.extname(filePath) === '.html'

  // Check if the flag is set for HTML modification
  if (customScriptInjection) {
    // Read the HTML file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if(err.code === 'ENOENT') {
          data = indexString
        } else {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
      }

      // Inject your custom script into the HTML
      const modifiedHtml = data.replace('</body>', `${customScript}</body>`);

      // Send the modified HTML
      res.send(modifiedHtml);
    });
  } else {
    // If it's not an HTML file, proceed with the regular static file serving
    express.static('.', {
      setHeaders: (res, path) => {
          // Set no-store only for HTML files
          res.setHeader('Cache-Control', 'no-store');
      }
    })(req, res, (err) => {
      if(err) {
        req.url = 'index.html'
        express.static('.')(req, res, next)
        return
      }
      next()
    })
  }
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


if(watchPath) {
  console.log('👀 Watching path', watchPath)
}

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
let promise = Promise.resolve()
let running = false
wss.on('connection', (ws) => {
  console.log('wss connected')
  ws.send('Connected to the WebSocket endpoint');

  fs.watch(watchPath, { recursive: true }, async (eventType, filename) => {
    if(running || filename.includes('bundle.js')) {
      return
    }

    console.log('filename', filename)
    running = true
    promise = promise.then(async () => {
      console.log('bundling...')
      await bundleScript.run()
      console.log('done')
      running = false
    })

    await promise

    const messageObject = {
      type:'file-change',
      filename:filename,
      changed: eventType,
    }
    ws.send(JSON.stringify(messageObject));
  });
});
