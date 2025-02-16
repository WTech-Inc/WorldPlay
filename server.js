const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 5000;

// 提供靜態文件
app.use(express.static(path.join(__dirname,'src')));
app.use(express.urlencoded({ extended: true })); // 啟用解析 application/x-www-form-urlencoded

//初始化DataBase（數據庫）
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error("資料庫連線錯誤", err.message);
    } else {
        console.log('已連線到 SQLite 資料庫。');
        // 創建 users 表格 (如果不存在)
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                chips INTEGER DEFAULT 0
            )
        `, (err) => {
            if (err) {
                console.error("創建表格錯誤", err.message);
            } else {
                console.log('Users 表格創建成功或已存在。');
            }
        });
    }
});

// 返回 html 文件
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html')); // 發送打包後的 index.html
});

app.post('/login', async (req,res) => {
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
            res.redirect(`/dash.html?username=${username}`);
        } else {
            res.status(401).json({ success: false, message: "帳號或密碼錯誤" }); // 返回 401 錯誤碼
        }

    } catch (error) {
        console.error("登入錯誤:", error);
        res.status(500).json({ success: false, message: "伺服器錯誤，請稍後再試" });
    }
});

app.get('/dash.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'dash.html'));
});

app.get('/game/bit', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'bit.html'));
});

// 關閉資料庫連線 (當伺服器關閉時)
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error("資料庫關閉錯誤", err.message);
        }
        console.log('關閉資料庫連線。');
        process.exit(0);
    });
});

app.listen(PORT,'0.0.0.0', () => {
    console.log(`運行端口：${PORT}`);
});