const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api/rate", { target: "http://localhost:8080/demo4training/" })
  );
};
