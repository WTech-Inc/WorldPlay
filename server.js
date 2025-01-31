const express = require('express');
const path = require('path');
const fetch = require('node-fetch');


const app = express();
const PORT = process.env.PORT || 5000;

// 提供靜態文件
// app.use(express.static('dist'));

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
        if (block.blockID.startsWith('190')) {
            let rawData = block.rawData.split('->');
            //rawData = username -> password
            if (rawData[0] == username && rawData[1] == pw) {
                res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>世遊娛樂城 -- ${username} 主頁</title>
            <style>
              #user {
                display: none;
                }
            </style>
        </head>
        <body>
            <span id='user'>${username}</span>
            <div id="root"></div>
            <script src="src/dash.js"></script>
        </body>
        </html>
    `);
            } else {
               let fd = new FormData();
               let nonce = Math.floor(Math.random()*(99999-10000+1))+10000;
               fd.append("blockID",`190${nonce.toString()}`)
                fd.append("data",`${username}->${pw}`)
                fetch("https://bc.wtechhk.xyz/upload",{method:'POST',body:fd})
                res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>世遊娛樂城 -- ${username} 主頁</title>
            <style>
              #user {
                display: none;
                }
            </style>
        </head>
        <body>
            <span id='user'>${username}</span>
            <div id="root"></div>
            <script src="src/dash.js"></script>
        </body>
        </html>
    `);
            }
        }
      });
    })
    .catch(err=>res.send(err));
});

app.listen(PORT, () => {
    console.log(`運行端口：${PORT}`);
});