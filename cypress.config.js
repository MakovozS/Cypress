const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        // Используем переменную окружения для baseUrl
        baseUrl: process.env.BASE_URL || "https://qauto.forstudy.space",
        supportFile: "cypress/support/e2e.js",
        env: {
            // Логин и пароль подтягиваются из переменных окружения
            username: process.env.USERNAME || "guest",
            password: process.env.PASSWORD || "welcome2qauto",
        },
        viewportWidth: 1280,
        viewportHeight: 720,
        video: true,
        chromeWebSecurity: false,
        reporter: "mochawesome",
        reporterOptions: {
            reportDir: "cypress/reports",
            overwrite: false,
            html: true,
            json: true,
        },
        screenshotsFolder: "cypress/screenshots",
        screenshotOnRunFailure: true,
    },
});
