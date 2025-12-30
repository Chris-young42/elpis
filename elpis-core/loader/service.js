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
  const servicePath = path.resolve(app.businessPath, `.${sep}service`);
  const filtList = glob.sync(
    path.resolve(servicePath, `.${sep}**${sep}**.js`)
  );
  const service = {};
  filtList.forEach((file) => {
    let name = path.resolve(file);
    name = name.substring(
      name.lastIndexOf(`service${sep}`) + `service${sep}`.length,
      name.lastIndexOf(".")
    );
    name = name.replace(/[_-][a-z]/gi, (s) => s.substring(1).toUpperCase());
    let tempService = service;
    const names = name.split(sep);
    for (let i = 0, len = names.length; i < len; i++) {
      if (i === len - 1) {
        const ServiceModule = require(path.resolve(file))(app);
        tempService[names[i]] = new ServiceModule();
      } else {
        if (!tempservice[names[i]]) {
          tempService[names[i]] = {};
        }
        tempService = tempService[names[i]];
      }
    }
  });
  app.service = service;
};
