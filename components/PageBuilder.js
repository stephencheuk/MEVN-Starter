const fs = require("fs");

class PageBuilder {
  constructor(page) {
    this.page = page;
  }

  openfile = (filepath) => {
    const path = require("path");
    const appDir = path.dirname(require.main.filename);
    const filePath = path.join(appDir, filepath);
    return fs.readFileSync(filePath, { encoding: "utf-8" });
  };

  parse = async () => {
    let ejs = require("ejs");

    let pageContent = this.openfile(this.page || "/pages/Message.html");

    return ejs.render(pageContent, { msg: "message here" }, (err, str) => {
      if (err) console.log(err, str);
    });
  };
}

module.exports = PageBuilder;
