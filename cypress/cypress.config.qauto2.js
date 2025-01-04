const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://qauto2.forstudy.space/",
        env: {
            username: "guest",
            password: "welcome2qauto",
        },
    },
    reporter: "mochawesome",
    reporterOptions: {
        reportDir: "reports/qauto2/mochawesome",
        overwrite: false,
        html: false,
        json: true,
    },
    video: true,
    screenshotsFolder: "reports/qauto2/screenshots",
    videosFolder: "reports/qauto2/videos",
});
