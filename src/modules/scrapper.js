const puppeteer = require("puppeteer");

class Scrapper {

    constructor() {
        this.browser = null;
        this.page = null;
    }

    scrapper = async () => {
        await this.launchBrowser();
        await this.gotoPage("https://www.linkedin.com/jobs/");
        await this.searchJobs("Junior nodeJs");
        const jobs = await this.getListJobs().finally(() => this.browser.close());

        return Promise.resolve(jobs);
    }

    launchBrowser = async () => {
        this.browser = await puppeteer.launch({
            headless: true
        });
    }

    gotoPage = async url => {
        this.page = await this.browser.newPage();
        await this.page.goto(url);
    }

    searchJobs = async searchThis => {
        await this.page.waitForSelector('.dismissable-input__input')
        await this.page.type('.dismissable-input__input', searchThis, {
            delay: 200
        });
        await this.page.keyboard.press("Enter");
    }

    getListJobs = async () => {
        return new Promise(async (resolve, reject) => {
            await this.page.waitForSelector(".base-card__full-link");
            const links = await this.page.$$(".base-card__full-link");
            const jobs = [];
            links.forEach(async (link, index) => {
                link = await (await link.getProperty("href")).jsonValue();
                jobs.push(link);
                if(index === links.length -1) {
                    resolve(jobs);
                }
            });
        });
    }
}

module.exports = Scrapper;