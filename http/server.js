const http = require("http");
const server = http.createServer();
const config = require("./config");

const moment = require("moment");
moment.locale("es_ES");

server.on("request", (req, res) => {
  if (req.method === "POST" && req.url === "/birthday") {
    let body = [];

    req
      .on("data", chunk => {
        body.push(chunk);
      })
      .on("end", () => {
        res.writeHead(config.stats.ok, {
          "Content-type": "text-plain",
          prueba: "exitosa",
        });
        body = Buffer.concat(body).toString();

        if (!moment(body, "YYYY-MM-DD").isValid()) {
          res.writeHead(config.stats.badRequest);
          res.end("No es un formato válido. Formato esperado YYYY-MM-DD");
        } else {
          let weekDayName = moment(body).format("dddd");
          if (weekDayName === "Fecha inválida") {
            res.writeHead(config.stats.badRequest);
            res.end("Fecha inválida!");
          } else {
            res.end("Tu dia de Nacimiento es: " + weekDayName);
          }
        }
      });
  } else {
    res.statusCode = config.stats.internalError;
    res.end();
  }
});

server.listen(config.port);
console.log("[Server] Servidor escuchando en el puerto " + config.port);
