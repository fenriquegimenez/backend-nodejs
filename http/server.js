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
          res.end("No es un formato válido. Formato esperado DD-MM-YYYY");
        } else {
          let weekDayName = moment(body).format("dddd");
          if (weekDayName === "Fecha inválida") {
            res.end("Fecha inválida!");
          } else {
            res.end("Tu dia de Nacimiento es: " + weekDayName);
          }
        }
      });
  } else {
    res.statusCode = config.stats.error;
    res.end();
  }
});

server.listen(config.port);
console.log("Servidor escuchando en el puerto " + config.port);
