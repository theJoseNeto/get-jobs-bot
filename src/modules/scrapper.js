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
                .then(async results => {
                    await this.createHyperLink(results)
                        .then(hLinks => resolve(hLinks));
                })
                .finally(() => this.browser.close());

        });
    }

    launchBrowser = async () => {

        this.browser = await puppeteer.launch({
            // executablePath: "~/usr/bin/chromium-browser",
            headless: true, // false to development mode
            args: ['--no-sandbox', '--disable-setuid-sandbox']
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

    createHyperLink = links => {
        const titles = []
        return new Promise((resolve, reject) => {
            for (let link of links) {
                const jobName = link.split("view/")[1].split("?")[0].replace("at", ".Empresa:").split("-");
                jobName.pop();
                const jobNameFormated = jobName.join(' ');

                titles.push(`[${jobNameFormated}](${link})`);
                if (titles.length === links.length) {
                    resolve(titles)
                    break;
                };
            }
        })

    }

}

module.exports = Scrapper;
