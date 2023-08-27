const puppeteer = require("puppeteer");

class PDF {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  URL = async () => {
    let options = {
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--start-maximized"],
      headless: "new",
      defaultViewport: null,
    };

    // Launch the browser and open a new blank page
    let browser = await puppeteer.launch(options);
    let page = await browser.newPage();

    response = await page.goto("https://www.google.com");

    await page.evaluate(`
      var div = document.createElement("div");
      div.style.position = 'absolute';
      div.style.top = '0';
      div.style.left = '0';
      div.style.width = '1366px';
      div.style.height = '1px';
      div.style.border = '1px solid transparent';
      document.body.append(div);
    `);

    if (response.status() > 399) {
      console.log(`Failed with response code ${response.status()}`);
      throw new Error(`Failed with response code ${response.status()}`);
    }

    await page.close();
    await browser.close();

    this.res.setHeader("Content-type", "application/pdf");
    this.res.setHeader("isBase64Encoded", true);
    // pdf = pdf.toString('base64');
    this.res.status(200).send(pdfpage);
  };

  writer = async (type) => {
    this.res.setHeader("Content-type", "application/pdf");
    if (type === "PaySlip") return this.writerPaySlip2();
    if (type === "PaySlip") return this.writerPaySlip();
    return null;
  };

  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  writerPaySlip2 = async () => {
    let report = require("puppeteer-report");
    const puppeteer = require("puppeteer");
    const browser = await puppeteer.launch({ headless: "new" });

    const path = require("path");
    const appDir = path.dirname(require.main.filename);

    let pagePath = path.join(appDir, "pages", "PaySlip.html");
    let pdfPath = path.join(appDir, ".cache", "page.pdf");

    const fs = require("fs");
    fs.unlinkSync(pdfPath);

    try {
      await report.pdf(browser, pagePath, {
        path: pdfPath,
        format: "a4",
        printBackground: true,
        margin: {
          bottom: "10mm",
          left: "10mm",
          right: "10mm",
          top: "10mm",
        },
      });

      const fs = require("fs");

      const pdfpage = fs.readFileSync(pdfPath);

      this.res.setHeader("Content-type", "application/pdf");
      // this.res.setHeader("Content-type", "text/plain");
      this.res.setHeader("isBase64Encoded", true);
      // pdf = pdf.toString('base64');
      this.res.status(200).send(pdfpage);
    } finally {
      await browser.close();
    }

    return false;
  };

  writerPaySlip = async () => {
    let pageWidth = 1024;
    let pageHeight = 1448;

    let options = {
      args: [
        "--no-sandbox",
        // "--disable-setuid-sandbox",
        // "--start-maximized",
        "--window-size=1920,1080",
        "--disable-infobars",
      ],
      headless: false,
      defaultViewport: {
        width: pageWidth,
        height: pageHeight,
      },
      // preferCSSPageSize: true,
    };

    // Launch the browser and open a new blank page
    let browser = await puppeteer.launch(options);
    let page = await browser.newPage();

    const PageBuilder = require("./PageBuilder");
    const PageHandler = new PageBuilder("/pages/PaySlip.html");
    await page.setContent(await PageHandler.parse(), {
      waitUntil: "networkidle0",
    });

    const headerTemplate = await page.evaluate(() => {
      let el = document.getElementsByClassName("page-header");
      let HTML;
      if (el.length > 0) {
        HTML = el[0].outerHTML;
        el[0].outerHTML = "";
      }

      HTML =
        HTML ||
        `<div style="width: 100%; font-size: 9px; display: flex; justify-content: center; border: 1px solid red">Header HERE 1</div>`;

      return HTML;
    });

    let [maxWidth, a, b, c] = await page.evaluate(() => [
      Math.max(document.body.scrollWidth, document.documentElement.clientWidth),
      document.body.scrollWidth,
      document.documentElement.clientWidth,
      window.innerWidth,
    ]);

    console.log(maxWidth, a, b, c);

    let pdfpage = await page.pdf({
      format: "A4",
      title: "Salary Pay Slip",
      landscape: false,
      margin: {
        left: "1cm",
        top: "8cm",
        right: "1cm",
        bottom: "1.5cm",
      },
      date: {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
      preferCSSPageSize: false,
      maxWidth,
      printBackground: true,
      width: pageWidth,
      height: pageHeight,
      scale: 1,
      displayHeaderFooter: true,
      headerTemplate,
      // : `
      //   <div style="width: 100%; font-size: 9px; display: flex; justify-content: center; border: 1px solid red">
      //     Header HERE
      //   </div>
      // `
      footerTemplate: `
        <div style="width: 100%; font-size: 9px;
            padding: 5px 5px 0; color: #bbb; position: relative;">
            <div style="position: absolute; width:100%; top: -20px;">
              <div style="text-align: center">
                <!-- Date: <span class="date"></span> -->
                Date: ${new Date()
                  .toLocaleDateString("en-hk", {
                    _weekday: "long",
                    year: "numeric",
                    month: "2-digit",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  })
                  .replace(",", "")}
                &nbsp;-&nbsp;
                Page: <span class="pageNumber"></span>/<span class="totalPages"></span>
              </div>
            </div>
        </div>
      `,
    });

    await page.close();
    await browser.close();

    this.res.setHeader("Content-type", "application/pdf");
    this.res.setHeader("isBase64Encoded", true);
    // pdf = pdf.toString('base64');
    this.res.status(200).send(pdfpage);

    return true;
  };

  writerTest = async () => {
    let options = {
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--start-maximized"],
      headless: "new",
      defaultViewport: null,
    };

    // Launch the browser and open a new blank page
    let browser = await puppeteer.launch(options);
    let page = await browser.newPage();

    let response;

    const PageBuilder = require("./PageBuilder");
    const PageHandler = new PageBuilder();
    response = await page.setContent(await PageHandler.parse());

    let pdfpage = await page.pdf({
      format: "A4",
      margin: {
        left: "1cm",
        top: "3cm",
        right: "1cm",
        bottom: "1.5cm",
      },
      date: {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
      printBackground: true,
      //width: 1024,
      //height: 1448,
      //scale: 1,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="width: 100%; font-size: 9px; display: flex; justify-content: center; border: 1px solid red">
          Header HERE
        </div>
      `,
      footerTemplate: `
        <div style="width: 100%; font-size: 9px;
            padding: 5px 5px 0; color: #bbb; position: relative;">
            <div style="position: absolute; width:100%; top: -20px;">
              <div style="text-align: center">
                <!-- Date: <span class="date"></span> -->
                Date: ${new Date()
                  .toLocaleDateString("en-hk", {
                    _weekday: "long",
                    year: "numeric",
                    month: "2-digit",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  })
                  .replace(",", "")}
                &nbsp;-&nbsp;
                Page: <span class="pageNumber"></span>/<span class="totalPages"></span>
              </div>
            </div>
        </div>
      `,
    });

    await page.close();
    await browser.close();

    this.res.setHeader("Content-type", "application/pdf");
    this.res.setHeader("isBase64Encoded", true);
    // pdf = pdf.toString('base64');
    this.res.status(200).send(pdfpage);

    return true;
  };
}

module.exports = PDF;
