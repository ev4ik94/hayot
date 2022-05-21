const path = require("path");

module.exports = {
    i18n: {
        locales: ["ru", "uz", "en"],
        defaultLocale: "ru",
        // localeDetection: false,
    },
    localePath: path.resolve("./assets/locales"),
};
