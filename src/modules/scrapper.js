const puppeteer = require("puppeteer");

class Scrapper {

    constructor() {
        this.browser = null;
        this.page = null;
    }

    scrapper = async (job, locale) => {

        return new Promise(async (resolve, reject) => {
            await this.launchBrowser();
            await this.gotoPage("https://www.linkedin.com/jobs/");
            await this.searchJobs(job, locale)
            await this.getListJobs()
                .then(results => resolve(results))
                .finally(() => this.browser.close());

            });
    }

    launchBrowser = async () => {

        this.browser = await puppeteer.launch({
            // executablePath: "~/usr/bin/chromium-browser",
            headless: true,
            args: ['--no-sandbox','--disable-setuid-sandbox']
        });
    }

    gotoPage = async url => {
        this.page = await this.browser.newPage();
        await this.page.goto(url);
    }

    searchJobs = async (job, locale) => {

        await this.page.waitForSelector('.dismissable-input__input')
            .then(async () => {
                //job
                await this.page.type('.dismissable-input__input', job, { delay: 200 });
                // cleanup locale input value
                await this.page.evaluate(() => document.querySelector('input[name="location"]').value = "");
                // new locale input value
                await this.page.type('input[name="location"]', locale, { delay: 200 });
                await this.page.keyboard.press("Enter");

            }).catch(async () => {
                await this.browser.close();
                await this.scrapper(job, locale);
            });
    }


    getListJobs = async () => {
        return new Promise(async (resolve, reject) => {
            await this.page.waitForSelector(".base-card__full-link");

            const links = await this.page.$$(".base-card__full-link");
            const jobs = [];

            links.forEach(async (link, index) => {
                link = await (await link.getProperty("href")).jsonValue();
                jobs.push(link);
                if (index === links.length - 1) {
                    resolve(jobs);
                }
            });
        });
    }

    // redirectToSearchPage = async (jobNameValue, JobLocaleValue) => {
    //     await this.page.waitForSelector(".authwall-join-form__title").then(
    //         async elem => {
    //             if (elem) {
    //                 await this.scrapper()
    //             }
    //         }
    //     );
    // }
}

module.exports = Scrapper;
