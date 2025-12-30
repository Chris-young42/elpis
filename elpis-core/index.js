const Koa = require("koa");
const path = require("path");
const { sep } = path;
const env = require("./env");
const middlewareLoader = require("./loader/middleware");
const extendLoader = require("./loader/extend");
const configLoader = require("./loader/config");
const routerLoader = require("./loader/router");
const serviceLoader = require("./loader/service");
const controllerLoader = require("./loader/controller");
const routerSchemaLoader = require("./loader/router-schema");

module.exports = {
  start(options = {}) {
    const app = new Koa();
    app.options = options;
    console.log(app.options);

    app.baseDir = process.cwd();
    console.log(app.baseDir);

    app.businessPath = path.resolve(app.baseDir, `.${sep}app`);
    console.log(app.businessPath);

    app.env = env();
    console.log(`--[start] env:${app.env.get()}--`);

    // 加载中间件
    middlewareLoader(app);
    console.log(`--[start] middleware done--`);
    // 加载路由 schema
    routerSchemaLoader(app);
    console.log(app.routerSchema);

    console.log(`--[start] router schema done--`);

    // 加载控制器
    controllerLoader(app);
    console.log(app.controller);

    console.log(`--[start] controller done--`);
    // 加载服务
    serviceLoader(app);
    console.log(app.service);
    console.log(`--[start] service done--`);
    // 加载配置
    configLoader(app);
    console.log(app.config);
    console.log(`--[start] config done--`);
    // 加载扩展
    extendLoader(app);
    console.log(app);
    console.log(`--[start] extend done--`);
    // 加载路由
    routerLoader(app);
    console.log(`--[start] router done--`);

    // 启动服务
    try {
      const port = process.env.PORT || 8080;
      const host = process.env.IP || "0.0.0.0";
      app.listen(port, host);
      console.log(`Server runnin on port: ${port}`);
    } catch (e) {
      console.error(e);
    }
  },
};
// koa 实例
