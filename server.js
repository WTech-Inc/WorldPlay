const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

// 提供靜態文件
app.use(express.static('dist'));

// 返回 html 文件
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>世遊娛樂城</title>
        </head>
        <body>
            <div id="root"></div>
            <script src="src/index.js"></script>
        </body>
        </html>
    `);
});

app.post('/login', (req,res) => {
  let username = req.body.user;
  let pw = req.body.pw;
  if (!username && !pw) {
    res.send("沒有東西");
  }
  if (!username || !pw) {
    res.send("沒有東西");
  }
  fetch("https://bc.wtechhk.xyz/get/chain")
    .then(res=>res.json())
    .then(data=>{
      data.forEach(block => {
        if (block.blockID.startswith('190')) {
            //let user login
        }
      });
    })
    .catch(err=>res.send(err));
});

app.listen(PORT, () => {
    console.log(`運行端口：${PORT}`);
});