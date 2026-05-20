// proxy-server.js
// Run with: node proxy-server.js
// Requires: npm install express http-proxy-middleware cors

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Allow all origins (tighten this in production)
app.use(cors());

// Serve static files (your HTML) from current directory
app.use(express.static("."));

// Proxy all /langflow/* requests to the real Langflow server
app.use(
  "/langflow",
  createProxyMiddleware({
    target: "https://langflow.servicesessentials.ibm.com",
    changeOrigin: true,
    pathRewrite: { "^/langflow": "" }, // strip /langflow prefix
    on: {
      proxyReq: (proxyReq) => {
        // Forward the API key
        proxyReq.setHeader("x-api-key", "sk-F1sRs8TrNwAkWGR-DUHBs4xdFEpeRSkCO7ntvvroHhU");
      },
    },
  })
);

app.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`);
  console.log(`Open your HTML at http://localhost:${PORT}/index.html`);
});
