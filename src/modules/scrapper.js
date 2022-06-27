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
        await this.getListJobs();

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
            await this.page.$eval(".base-card__full-link", elem => elem.href)
            .then((hrefValue)=> {
                console.log(hrefValue)
            });
        })
    }
}
const scrp = new Scrapper();

scrp.scrapper();