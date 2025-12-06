import puppeteer, { Browser } from "puppeteer";
import getSiteConfig from "./SITE_CONFIG.js";
import { delay } from "./utils.js";

/**
 * 
 * @param {Browser} browser 
 * @param {String} url 
 * @returns 
 */
export async function scrapePrice(browser, url){
    if (!url || url === "") return null;

    const site = getSiteConfig(url);
    if (!site) {
        console.warn(`Skipping unknown URL: ${url}`);
        return null;
    };

    const page = await browser.newPage();

    await page.setUserAgent(2);

    await page.setViewport({width: 1920, height: 1080});

    await delay(500, 2000);

    // await page.setRequestInterception(true);
    // page.on('request', (req) => {
    //     if(['image','font','media','stylesheet'].includes(req.resourceType())) {
    //         req.abort();
    //     } else {
    //         req.continue();
    //     };
    // });

    try {
        await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 30000 });

        if (site.name === 'Amazon') {
            try{
                const continueBtn = await page.waitForSelector('button.a-button-text', {timeout: 2000});

                if (continueBtn) {
                    console.log('Found "Continue Shopping" button. Clicking it...');
                    await continueBtn.click();
                    console.log("Clicked!")

                    await page.waitForNavigation({waitUntil: 'domcontentloaded'});
                }
            } catch(e){

            }
        }

        await delay(1000,3000);

        const html = await page.content();
        if (html.includes("no longer available")){
            console.warn(` Item is Out of Stock: ${url}`);
            return null;
        }

        await page.waitForSelector(site.selector, {  visible: true,timeout: 50000 });

        const priceText = await page.$eval(site.selector, el => el.textContent);

        const priceNumber = parseFloat(priceText.replace(/[^0-9.]/g, ''));

        return priceNumber

    } catch (error){
        
        const timestamp = new Date().getTime();
        const filename = `error_${site.name}_${timestamp}.png`
        await page.screenshot({path: filename});
        
        console.warn(`Failed to scrape ${site.name}: ${error.message}`);
        console.warn(`Screenshot saved to ${filename} (Check this image!)`);
        return null;
    } finally {
        await delay(500, 1500);
        await page.close();
    }
}
