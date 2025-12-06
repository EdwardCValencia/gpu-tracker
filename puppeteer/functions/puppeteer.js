import puppeteer from "puppeteer";
import https from 'node:https'
import newegg from './newegg.js'

async function extract(url) {
    const browser = await puppeteer.launch({
        headless: 'new'
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

    if(url.includes('amazon')){
        
        await page.goto(url);

        await page.waitForSelector('.a-offscreen', { visible: true })
        
        price = await (await page.$eval('.a-offscreen', el => el.textContent)).split(/ /)[0].replace(/[^\d]/g, '')

        // const res = await textSelector?.evaluate(el => el.textContent)
        
        console.log("Price: $"+price+" Amazon")
    }

    if(url.includes('bestbuy')){
        console.log(url)
        await page.goto(url, {waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        await page.title().then((res) => console.log(res))

        await page.waitForSelector('.leading-7', { visible: true })
        
        price = await (await page.$eval('.leading-7', el => el.textContent)).split(/ /)[0].replace(/[^\d]/g, '');

        console.log("Price: "+price+" BestBuy")
    }

    if(url.includes('newegg')){
        // await browser.close()

        // await puppeteer.launch({
        //     headless: false
        // });

        // await browser.newPage();
        
        // await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 60000}).then((res) => console.log(res))

        // // const title = await page.title();
        // // console.log(title)
        // await page.waitForSelector('.price-current', { visible: true })

        // price = await (await page.$eval('.price-current', el => el.textContent)).split(/ /)[0].replace(/[^\d]/g, '');

        // console.log("Price: "+price+" Newegg")
        newegg(url)
    }

    await browser.close();
    return 0;
}

extract('https://www.amazon.com/dp/B0DS2WQZ2M')
// extract('https://www.bestbuy.com/product/asus-rog-astral-nvidia-geforce-rtx-5090-32gb-gddr7-pci-express-5-0-graphics-card-black/JJGGLHJVSV')
// extract('https://www.newegg.com/asus-rog-astral-rog-astral-rtx5090-o32g-gaming-geforce-rtx-5090-32gb-graphics-card-triple-fans/p/N82E16814126751?item=N82E16814126751')