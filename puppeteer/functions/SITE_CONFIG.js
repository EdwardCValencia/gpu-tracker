const SITE_CONFIG = {
    'amazon.com': { selector: '.a-price .a-offscreen', name: 'Amazon' },
    'bestbuy.com': { selector: '.leading-7', name: 'BestBuy' },
    'newegg.com': { selector: '.price-current', name: 'Newegg' }
};

//Determine which site a url belongs to
export default function getSiteConfig(url){
    if (url.includes('amazon')) return SITE_CONFIG["amazon.com"];
    if (url.includes('bestbuy')) return SITE_CONFIG["bestbuy.com"];
    if (url.includes('newegg')) return SITE_CONFIG["newegg.com"];
    return null;
}

