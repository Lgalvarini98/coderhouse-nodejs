const os = require("os");

const Index = (req, res) => res.send("Bienvenido a mi servidor");

const Info = (req, res) => {
  res.json({
    argumentos_de_entrada: process.argv,
    nombre_sistema_operativo: process.platform,
    version_node: process.version,
    memoria_total_reservada: process.memoryUsage().rss,
    path_de_ejecucion: process.execPath,
    process_id: process.pid,
    carpeta_del_proyecto: process.cwd(),
    info: {
      message: "Server information",
      cpuCount: os.cpus().length,
    },
  });
};

const Main = (req, res) => {
  res.render("main.handlebars");
};

module.exports = {
  Index,
  Main,
  Info,
};
