const puppeteer = require('puppeteer');

let scrape = async function getPic() {
    const browser = await puppeteer.launch({ headless: false });
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = 'https://www.airbnb.co.uk/rooms/28299515?location=London%2C%20United%20Kingdom&adults=1&toddlers=0&guests=1&check_in=2019-04-26&check_out=2019-04-30&children=0&infants=0&source_impression_id=p3_1556908000_3lhd7Br%2FU9h4zQXg'
    await page.goto(url);
    await page.waitForSelector('#amenities > div > div > div > div > section > div:nth-child(3) > div > button');
    await page.click('#amenities > div > div > div > div > section > div:nth-child(3) > div > button');
    await page.waitFor(1000);

    const amenities = await page.evaluate(() => {
        let content = Array.from(document.querySelectorAll('._wpwi48 ._czm8crp')).map(item => {
            return item.innerText;
        })

        return content;
    })

    const descriptions = await page.evaluate(() => {
        let content = Array.from(document.querySelectorAll('._wpwi48 ._1jlnvra2')).map(item => {
            return item.innerText;
        })

        return content;
    })

    browser.close();
    return {
        amenities,
        descriptions
    }

}

scrape();
scrape().then((value) => {
    console.log('the end result', value); // It works !
})