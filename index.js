const puppeteer = require('puppeteer');
const path = require('path');

const headerTemplate = `
<style>
  .header {
    padding: 0 38px 0 38px;
    height: 10px
    width: 100%;
    font-size: 12px;
    background-color: green;
    -webkit-print-color-adjust: exact;
  }
</style>
<div class="header"></div>
`;

const footerTemplate = `
<style>
  .footer {
    padding: 0 38px 0 38px;
    width: 100%;
    font-size: 12px;
    background-color: red;
    -webkit-print-color-adjust: exact;
  }
</style>
<div class="footer">
  <div class="title" style="display: inline-block;"></div>
</div>
`;

const generatePDF = async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  await page.goto(`file:${path.join(__dirname, 'index.html')}`, { waitUntil: ['load', 'domcontentloaded', 'networkidle0'] });

  const pdf = await page.pdf({
    path: 'test.pdf',
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    printBackground: true,
    footerTemplate,
    headerTemplate,
  });

  await browser.close();

  return;
};

generatePDF();
