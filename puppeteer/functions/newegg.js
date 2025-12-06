import puppeteer from "puppeteer";

async function newegg(url) {
    console.log(" Calling NewEgg function....")
    
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    let price,seller
    await page.setViewport({width: 1080, height: 1024});
    await page.setUserAgent(2)

    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
            req.abort();
        } else {
            req.continue();
        }
    });

    await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 60000})

    await page.waitForSelector('.price-current', { visible: true })

    price = await (await page.$eval('.price-current', el => el.textContent)).split(/ /)[0].replace(/[^\d]/g, '');

    console.log("Price: "+price+" Newegg")

    await browser.close()
}

        
        

        // const title = await page.title();
        // console.log(title)
export default newegg