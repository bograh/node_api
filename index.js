const http = require("http");

const PORT = Number(process.env.PORT) || 3000;

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);

  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    return sendJson(res, 200, {
      message: "Node API is running",
      endpoints: ["/", "/health"],
    });
  }

  if (req.method === "GET" && req.url === "/health") {
    return sendJson(res, 200, {
      status: "ok",
    });
  }

  return sendJson(res, 404, {
    error: "Not Found",
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`API listening on port ${PORT}`);
});
