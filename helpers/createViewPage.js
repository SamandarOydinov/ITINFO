const path = require("node:path");

const creatViewPage = (page) =>
  path.resolve(__dirname, "../views", `${page}.hbs`);

module.exports = { creatViewPage, };
