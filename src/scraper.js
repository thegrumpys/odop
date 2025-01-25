import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setViewport({width: 1080, height: 1024});

// Navigate the page to a URL.
await page.goto('https://www.grainger.com/product/Compression-Spring-302-Stainless-1NCG3', { waitUntil: 'networkidle0' });

const data = await page.evaluate(() => document.querySelector('*').outerHTML);

console.log('data=',data);

await browser.close();

//===========================================================================
//import puppeteer from 'puppeteer';
//// Or import puppeteer from 'puppeteer-core';
//
//// Launch the browser and open a new blank page
//const browser = await puppeteer.launch();
//const page = await browser.newPage();
//
//// Navigate the page to a URL.
//await page.goto('https://developer.chrome.com/');
//
//// Set screen size.
//await page.setViewport({width: 1080, height: 1024});
//
//// Type into search box.
//await page.locator('.devsite-search-field').fill('automate beyond recorder');
//
//// Wait and click on first result.
//await page.locator('.devsite-result-item-link').click();
//
//// Locate the full title with a unique string.
//const textSelector = await page
//  .locator('text/Customize and automate')
//  .waitHandle();
//const fullTitle = await textSelector?.evaluate(el => el.textContent);
//
//// Print the full title.
//console.log('The title of this blog post is "%s".', fullTitle);
//
//await browser.close();

//===========================================================================
//import axios from 'axios';
//import * as cheerio from 'cheerio';
//
//async function scrapeData(url) {
//  try {
//    const response = await axios.get(url);
////    console.log('response=',response);
//    const $ = cheerio.load(response.data);
//    console.log('$=',$);
//    // Example: Extract all links from the page
//    const links = [];
//    $('a').each((i, el) => {
//      console.log('i=',i,'el=',el);
//      const href = $(el).attr('href');
//      if (href) {
//        links.push(href);
//      }
//    });
//    return links;
//  } catch (error) {
//    console.error('Error:', error);
//  }
//}
//
//// Usage:
//scrapeData('https://www.grainger.com/category/hardware/springs/compression-die-springs?filters=webParentSkuKey&webParentSkuKey=WP13413059')
//  .then(links => 
//    console.log(links)
//  ).catch(error =>
//    console.error(error)
//  );