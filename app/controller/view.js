module.exports = (app) => {
  return class ViewController {
    async renderPage(ctx) {
        await ctx.render(`output/entry.${ctx.params.page}`, {
            title: 'Elpis Framework',
            name: app.config.name,
            age: app.config.age,
        });
    }
  };
};
