const express = require('express');
const path = require('path');
const fetch = require('node-fetch');


const app = express();
const PORT = process.env.PORT || 5000;

// 提供靜態文件
app.use(express.static(path.join(__dirname,'op')));

// 返回 html 文件
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html')); // 發送打包後的 index.html
});

app.post('/login', (req,res) => {
  const { username, pw } = req.body;

  if (!username || !pw) {
    return res.status(400).json({ success: false, message: "請輸入帳號和密碼" });
  }
  try {
        const chainData = await fetch("https://bc.wtechhk.xyz/get/chain").then(res => res.json());
        let userFound = false;
        for (const block of chainData) {
            if (block.blockID.startsWith('190')) {
                const rawData = block.rawData.split('->');
                const storedUsername = rawData[0];
                const storedPassword = rawData[1];

                if (storedUsername === username && storedPassword === pw) {
                    userFound = true;
                    break;
                }
            }
        }

        if (userFound) {
            res.json({ success: true, message: "登入成功", username: username }); // 返回 JSON 成功響應
        } else {
            res.status(401).json({ success: false, message: "帳號或密碼錯誤" }); // 返回 401 錯誤碼
        }

    } catch (error) {
        console.error("登入錯誤:", error);
        res.status(500).json({ success: false, message: "伺服器錯誤，請稍後再試" });
    }
});

app.listen(PORT,'0.0.0.0', () => {
    console.log(`運行端口：${PORT}`);
});