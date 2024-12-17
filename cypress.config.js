const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 720,

    pageLoadTimeout: 60000,
    reporter: "spec",
    video: true,
    chromeWebSecurity: false,
    screenshotsFolder: "cypress/screenshots",
    screenshotOnRunFailure: true
  }
});
