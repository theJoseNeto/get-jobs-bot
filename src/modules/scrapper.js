const puppeteer = require("puppeteer");

puppeteer.launch({headless: false}).then(() => {
    console.log("browser is running! 🏆")
});

