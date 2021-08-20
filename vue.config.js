const path = require("path");

module.exports = {
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].title = "Logbook Anywhere";
            return args;
        });
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
            },
        },
    },
    outputDir: path.resolve(__dirname, "./backend/public"),
    publicPath: process.env.NODE_ENV === "production" ? "/logbook/" : "/",
};
