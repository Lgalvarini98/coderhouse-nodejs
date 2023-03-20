const { Router } = require("express");
const { fork } = require("child_process");
const router = Router();

router.get("/", (req, res) => {
  let cant = parseInt(req.query.cant, 10) || 100000000;
  cant = Math.min(cant, 100000000); // limitar a un máximo de 100,000,000
  const max = 1000;

  console.log(`Generando ${cant} números aleatorios en el rango del 1 al ${max}...`);

  const child = fork("./src/service/randoms.js");

  child.send({ cant, max });

  child.on("message", (data) => {
    res.json(data);
  });
});

module.exports = router;
