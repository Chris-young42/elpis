const path = require("path");
const { sep } = path;
const glob = require("glob");

// elpis-core/loader/middleware.js
// 中间件加载器
/**
 *
 * @param {*} app
 */

module.exports = (app) => {
  const controllerPath = path.resolve(app.businessPath, `.${sep}controller`);
  const filtList = glob.sync(
    path.resolve(controllerPath, `.${sep}**${sep}**.js`)
  );
  const controller = {};
  filtList.forEach((file) => {
    let name = path.resolve(file);
    name = name.substring(
      name.lastIndexOf(`controller${sep}`) + `controller${sep}`.length,
      name.lastIndexOf(".")
    );
    name = name.replace(/[_-][a-z]/gi, (s) => s.substring(1).toUpperCase());
    let tempController = controller;
    const names = name.split(sep);
    for (let i = 0, len = names.length; i < len; i++) {
      if (i === len - 1) {
        const ControllerModule = require(path.resolve(file))(app);
        tempController[names[i]] = new ControllerModule();
      } else {
        if (!tempController[names[i]]) {
          tempController[names[i]] = {};
        }
        tempController = tempController[names[i]];
      }
    }
  });
  console.log(controller,"---controller---");

  app.controller = controller;
};
