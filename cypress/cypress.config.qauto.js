const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://qauto.forstudy.space/",
        env: {
            username: "guest",
            password: "welcome1qauto",
        },
    },
    reporter: "mochawesome",
    reporterOptions: {
        reportDir: "reports/qauto1/mochawesome",
        overwrite: false,
        html: false,
        json: true,
    },
    video: true,
    screenshotsFolder: "reports/qauto1/screenshots",
    videosFolder: "reports/qauto1/videos",
});