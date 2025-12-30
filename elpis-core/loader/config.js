const path = require("path");
const { sep } = path;
/**
 * config loader
 * @param {object} app koa 实例
 *
 * 配置区分 本地/测试/生产，通过 env 环境读取不同文件配置 env.config
 * 通过 env.config 覆盖 default.config 加载到 app.config 中
 *
 * 目录下对应的 config 配置
 * 默认配置 config/config.default.js
 * 本地配置 config/config.local.js
 * 测试配置 config/config.beta.js
 * 生产配置 config/config.prod.js
 *
 */

module.exports = (app) => {
  const configPath = path.resolve(app.baseDir, `.${sep}config`);
  let defaultConfig = {};
  try {
    defaultConfig = require(path.resolve(
      configPath,
      `.${sep}config.default.js`
    ));
  } catch (error) {
    console.log("[config loader] no default config js found");
  }

  let envConfig = {};
  try {
    if (app.env.isLocal()) {
      envConfig = require(path.resolve(configPath, `.${sep}config.local.js`));
    } else if (app.env.isBeta()) {
      envConfig = require(path.resolve(configPath, `.${sep}config.beta.js`));
    } else if (app.env.isProduction()) {
      envConfig = require(path.resolve(configPath, `.${sep}config.prod.js`));
    }
  } catch (error) {
    console.log("[exceptTion] there is no env.config file");
  }
  app.config = Object.assign({}, defaultConfig, envConfig);
  console.log(" app.config => ", app.config);
};
