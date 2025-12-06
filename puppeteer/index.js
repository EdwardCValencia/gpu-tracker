import fs from 'fs/promises'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { scrapePrice } from './functions/scrape.js'
import { delay } from './functions/utils.js'

puppeteer.use(StealthPlugin());

const MAX_CONCURRENT_TABS = 3;
const DATA_FILE = './data/gpus.json';

async function main() {
  console.log("Starting GPU Scraper...");

  const rawData = await fs.readFile(DATA_FILE, 'utf-8');
  const gpuData = JSON.parse(rawData);

  let jobs = [];

  gpuData.gpu_database.forEach(maker => {
    maker.series.forEach(series => {
      series.tiers.forEach(tier => {
        tier.models.forEach(model => {
          if (model.urls) {
            Object.keys(model.urls).forEach(storeKey => {
              const url = model.urls[storeKey];
              if (url && url.length > 0) {
                jobs.push({
                  modelRef: model,
                  storeKey: storeKey,
                  url: url
                })
              }
            })
          }
        })
      })
    })
  });

  console.log(`Found ${jobs.length} links to scrape.`)

  const browser = await puppeteer.launch({ headless: false });

  try { 
    for (let i = 0; i < jobs.length; i += MAX_CONCURRENT_TABS) {
      const chunk = jobs.slice(i, i + MAX_CONCURRENT_TABS);
      console.log(`Processing batch ${i +1} to ${i + chunk.length}...`);

      await Promise.all(chunk.map(async (job) => {
        const price = await scrapePrice(browser, job.url);
        
        if (price) {
          console.log(`✅ ${job.modelRef.brand} ${job.modelRef.name} [${job.storeKey}]: $${price}`);

          if (!job.modelRef.scraped_prices){
            job.modelRef.scraped_prices = {};
          }

          job.modelRef.scraped_prices[job.storeKey] = price;


        }
      }));

      if (i + MAX_CONCURRENT_TABS < jobs.length) {
        await delay(3000,8000)
      }

    }
  } catch (err) {
    console.error("Fatal loop error:", err);
  } finally {
    await browser.close();
  }

  await fs.writeFile('../public/output.json', JSON.stringify(gpuData, null, 2));
  console.log("🎉 Scrape complete. Data saved to output.json");
}

await main()