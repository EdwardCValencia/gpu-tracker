export const flattenData = (data) => {
    const flattened = [];

    console.log("Data received: ",data)

    const database = Array.isArray(data) ? data : (data?.gpu_database || []);

    // if (!data || !data.gpu_database || !Array.isArray(data.gpu_database)) {
    //     console.warn('output.json is empty or malformed.')
    //     return [];
    // }

    if (database.length === 0){
        console.warn("output.json is empty or malformed.");
        return [];
    }

    // data.gpu_database.forEach(maker => {
    database.forEach(maker =>{
        if (!maker.series) return;

        maker.series.forEach(series => {
            if(!series.tiers) return;

            series.tiers.forEach(tier => {
                if(!tier.models) return;

                tier.models.forEach(model => {

                    const links = [];
                    if (model.urls){
                        Object.keys(model.urls).forEach(store => {
                            const storeName = store.charAt(0).toUpperCase() + store.slice(1)
                            const url = model.urls[store];
                            const price = model.scraped_prices ? model.scraped_prices[store] : null;

                            if (url) {
                                links.push({
                                    store: storeName,
                                    url: url,
                                    price: price || null
                                });
                            }
                        });
                    }
                    // const prices = model.scraped_prices ? Object.values(model.scraped_prices) : [];

                    const validPrices = links
                        .map(link => link.price)
                        .filter(p => p !== null && p > 0);

                    // const lowestPrice = validPrices.length > 0 ? Math.min(...validPrices) : null;

                    let bestPrice = null;

                    let bestUrl = null;
                    let bestLink = 'n/a'
                    // if (model.scraped_prices){
                    //     bestStore = Object.keys(model.scraped_prices).find(
                    //         store => model.scraped_prices[store] === lowestPrice
                    //     );
                    // }

                    if ( validPrices.length > 0 ){
                        bestPrice = Math.min(...validPrices);
                        const bestStore = links.find(link => link.price === bestPrice);
                        if (bestStore){
                            bestUrl = bestStore.url;
                            bestLink = bestStore.store
                        }
                    } else if(model.current_price > 0 ) {
                        bestPrice = model.current_price;
                        bestLink = "---";
                        bestUrl = links.length > 0 ? links[0].url : '#';
                    }

                    flattened.push({
                        id: (model.name + tier.tier_name).replace(/\s+/g, '-'),
                        name: model.name,
                        brand: model.brand,
                        manufacturer: maker.manufacturer,
                        series: series.series_name,
                        tier: tier.tier_name,
                        msrp: model.msrp || tier.reference_price,
                        price: bestPrice,
                        image: model.image || 'placehold.co/300x200?text=No+Image',
                        bestStore: bestLink,
                        links: links,
                        url: bestUrl,
                        bestLink: bestLink
                    });
                });
            });
        });
    });
    return flattened;
};

export const getVerdict = (price, msrp) => {
    if (!price) return {text: "Out of Stock", color: "gray"};

    const diff = ((price - msrp) / msrp) * 100;

    if (diff <= 0) return {text: "Great Deal", color: "green"};
    if (diff <= 15) return {text: "Decent Price", color: "black"};
    return {text: "Bad Deal", color: "red"};
};