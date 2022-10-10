module.exports = {
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].title = "Logbook Anywhere";
            return args;
        });
    },
};
