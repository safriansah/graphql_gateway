require('dotenv').config()

const express = require('express')
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express()

console.log("server url::", process.env.SERVER_URL);

const proxy = createProxyMiddleware({
  target: process.env.SERVER_URL + '/graphql',
  changeOrigin: true,
  ws: false,
  logLevel: "warn",
  cookieDomainRewrite: { "*": "" },
  cookiePathRewrite: { "*": "" },
});

app.use("/graphql", proxy);

const hello = createProxyMiddleware({
  target: process.env.SERVER_URL,
  changeOrigin: true,
  ws: false,
  logLevel: "warn",
});

app.use("/", hello);

app.listen(parseInt(process.env.PORT), () => {
  console.log('gateway started on localhost:', process.env.PORT)
})