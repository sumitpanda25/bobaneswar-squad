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

// Proxy configuration for Langflow API
const proxyConfig = {
  target: "https://langflow.servicesessentials.ibm.com",
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq) => {
      // Forward the API key
      proxyReq.setHeader("x-api-key", "sk-F1sRs8TrNwAkWGR-DUHBs4xdFEpeRSkCO7ntvvroHhU");
      console.log(`[Proxy] ${proxyReq.method} ${proxyReq.path}`);
    },
    proxyRes: (proxyRes) => {
      // Remove upstream CORS headers to prevent duplicates
      delete proxyRes.headers['access-control-allow-origin'];
      delete proxyRes.headers['access-control-allow-credentials'];
      delete proxyRes.headers['access-control-allow-methods'];
      delete proxyRes.headers['access-control-allow-headers'];
      
      console.log(`[Proxy] Response status: ${proxyRes.statusCode}`);
    },
  },
};

// Proxy /api/* requests (for dashboard API calls)
// Express strips /api, so we need to add it back
app.use("/api", createProxyMiddleware({
  ...proxyConfig,
  pathRewrite: (path) => `/api${path}`, // Add /api back to the path
}));

// Proxy /langflow/* requests (for chat widget) - strip /langflow prefix
app.use(
  "/langflow",
  createProxyMiddleware({
    ...proxyConfig,
    pathRewrite: { "^/langflow": "" }, // strip /langflow, forward rest to Langflow
  })
);

app.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`);
  console.log(`Open your HTML at http://localhost:${PORT}/index.html`);
  console.log(`Proxying to: https://langflow.servicesessentials.ibm.com`);
});
