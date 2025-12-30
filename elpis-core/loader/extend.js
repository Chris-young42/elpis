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
  const extendPath = path.resolve(app.businessPath, `.${sep}extend`);
  const filtList = glob.sync(path.resolve(extendPath, `.${sep}**${sep}**.js`));
//   const extend = {};
  filtList.forEach((file) => {
    let name = path.resolve(file);
    name = name.substring(
      name.lastIndexOf(`extend${sep}`) + `extend${sep}`.length,
      name.lastIndexOf(".")
    );
    name = name.replace(/[_-][a-z]/gi, (s) => s.substring(1).toUpperCase());

    for (const key in app) {
      if (key === name) {
        console.log(`extend 名称 ${name} 已存在，请更换名称`);
        return;
      }
    }
    app[name] = require(path.resolve(file))(app);
  });
};
