const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://qauto.forstudy.space", // URL приложения
        supportFile: "cypress/support/e2e.js", // Путь к файлу поддержки
        env: {
            username: "guest", // Имя пользователя для базовой авторизации
            password: "welcome2qauto", // Пароль
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
