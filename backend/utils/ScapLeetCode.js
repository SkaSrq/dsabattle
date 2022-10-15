const express = require("express");
const router = express.Router();
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
// const { Name } = require("selenium-webdriver/lib/command");
require("chromedriver");
// const DRIVER_PATH = require("/Users/shariqueaman/Downloads/chromedriver");
const obj = [{}];
const axios = require("axios");

// router.post("/leetcode", async (req, res) => {
//   const questions = req.body;

//   for (let i of questions) {
//     // console.log(i.titleSlug);
//     //   }
//     options = new chrome.Options();
//     // options.addArguments("--headless");
//     options.addArguments("--kiosk");
//     let driver = await new Builder().forBrowser("chrome").build();
//     try {
//       await driver.get("https://leetcode.com/problems/" + i.titleSlug);

//       await driver.wait(
//         until.elementLocated(By.css("div[class='description__24sA']")),
//         30 * 1000
//       );

//       //   const prm1 = new Promise(async (resolve, reject) => {
//       //     const result = await driver.findElement(
//       //       By.css("div[class='description__24sA']")
//       //     );
//       //     resolve(result);
//       //   });
//       //   prm1.then((re) => {
//       //     console.log(re);
//       //   });
//       const result = await driver.findElement(
//         By.css("div[class='description__24sA']")
//       );
//       console.log(result);
//       // .then(async (result) => {
//       //   const txt = result.getText();
//       //   console.log(txt);
//       //   //   obj.push(txt);
//       // });
//       //   await driver.get("http://google.com");
//       //   await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
//       //   await driver.wait(until.titleIs("webdriver - Google Search"), 1000);

//       //         const result = await driver.findElement(
//       //           // By.className("content__u3I1 question-content__JfgR")
//       //           By.css("div[class='content__u3I1 question-content__JfgR']")
//       //         );
//       //         console.log(result);
//     } finally {
//       console.log(obj);
//       await driver.quit();
//     }
//   }
//   res.status(200).json({ message: "success" });
// });

// const express = require("express");
// const router = express.Router();
// const { Builder, By, Key, until } = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");
// // const { Name } = require("selenium-webdriver/lib/command");
// require("chromedriver");
// // const DRIVER_PATH = require("/Users/shariqueaman/Downloads/chromedriver");
// const obj = [{}];

// router.post("/leetcode", async (req, res) => {
//   const questions = req.body;

//   for (let i of questions) {
//     options = new chrome.Options();
//     await new Builder()
//       .forBrowser("chrome")
//       .build()
//       // driverPromise
//       .then((driver) =>
//         driver.get("https://leetcode.com/problems/" + i.titleSlug)
//       )
//       .then(() => {
//         driver.findElement(By.css("div[class='description__24sA']"));
//       })
//       .then((element) => {
//         console.log(element);
//       });
//   }
// });

router.get("/leetcode/:slug", async (req, res) => {
  const slug = req.params.slug;
  const newURL = "http://127.0.0.1:5000/leetcode/" + slug;
  console.log(newURL);
  axios.post(newURL, {}).then((result) => {
    // console.log(result.data);
    res.status(200).send(result.data);
  });
});
module.exports = router;
