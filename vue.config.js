const path = require("path");

module.exports = {
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].title = "Logbook Anywhere";
            return args;
        });
    },
    outputDir: path.resolve(__dirname, "./backend/public"),
};
