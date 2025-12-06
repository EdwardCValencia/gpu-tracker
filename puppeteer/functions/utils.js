export function delay(min, max) {
    const time = Math.floor(Math.random() * (max-min +1) + min);
    console.log(`Resting for ${time/1000}s to avoid detection...`);
    return new Promise(resolve => setTimeout(resolve,time));
}