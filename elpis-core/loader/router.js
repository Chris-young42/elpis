const path = require("path");
const { sep } = path;
const KoaRouter = require("koa-router");
const { glob } = require("glob");

module.exports = (app) => {
  const routerPath = path.resolve(app.businessPath, `.${sep}router`);
  const router = new KoaRouter();

  const fileList = glob.sync(path.resolve(routerPath, `.${sep}**${sep}**.js`));
  fileList.forEach((file) => {
    require(path.resolve(file))(app, router);
  });

  router.get("*", async (ctx, next) => {
    ctx.status = 302;
    ctx.redirect(`${app?.options?.homePage ?? "/"}`);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
};
