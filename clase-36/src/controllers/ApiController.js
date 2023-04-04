const os = require("os");

const Index = (req, res) => res.redirect("/login");

const Info = (req, res) => {
  res.json({
    argumentos_de_entrada: process.argv.slice(2),
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

module.exports = {
  Index,
  Info,
};
