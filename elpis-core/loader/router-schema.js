const { glob } = require("glob");
const path = require("path");
const { sep } = path;
module.exports = (app) => {
  const routerSchemaPath = path.resolve(
    app.businessPath,
    `.${sep}router-schema`
  );
  const fileList = glob.sync(
    path.resolve(routerSchemaPath, `.${sep}**${sep}**.js`)
  );
  let routerSchema = {};
  fileList.forEach((file) => {
    routerSchema = {
      ...routerSchema,
      ...require(path.resolve(file)),
    };
  });
  app.routerSchema = routerSchema;
};
