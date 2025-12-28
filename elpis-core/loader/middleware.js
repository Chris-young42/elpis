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
  const middlewarePath = path.resolve(app.businessPath, `.${sep}middleware`);
  const filtList = glob.sync(
    path.resolve(middlewarePath, `.${sep}**${sep}**.js`)
  );
  const middlewares = {};
  filtList.forEach((file) => {
    let name = path.resolve(file);
    name = name.substring(
      name.lastIndexOf(`middleware${sep}`) + `middleware${sep}`.length,
      name.lastIndexOf(".")
    );
    name = name.replace(/[_-][a-z]/gi, (s) => s.substring(1).toUpperCase());
    let tempMiddleware = middlewares;
    const names = name.split(sep);
    for (let i = 0, len = names.length; i < len; i++) {
      if (i === len - 1) {
        tempMiddleware[names[i]] = require(path.resolve(file))(app);
      } else {
        if (!tempMiddleware[names[i]]) {
          tempMiddleware[names[i]] = {};
        }
        tempMiddleware = tempMiddleware[names[i]];
      }
    }
  });
  app.middlewares = middlewares;
};
