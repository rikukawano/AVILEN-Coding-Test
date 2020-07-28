const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const endpoint = req.url;
  if (endpoint === "/start") {
    fs.readFile("./index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }
  if (endpoint === "/api") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      body = JSON.parse(body);
      result = fizzBuzz(body.obj);
      res.end(JSON.stringify({ data: result }));
    });
  }
});

const fizzBuzz = (arr) => {
  let result = "";
  let hasText = false;
  for (let i = 1; i <= 30; i++) {
    for (let j = arr.length - 1; j >= 0; j--) {
      if (i % arr[j].num === 0) {
        result += arr[j].text;
        hasText = true;
        break;
      }
    }
    if (i === 30) break;
    hasText ? (result += ", ") : (result += i + ", ");
    hasText = false;
  }
  return result;
};

server.listen(8080);
