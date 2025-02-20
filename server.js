const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const sqlite3 = require('sqlite3').verbose();
const SHA256 = require("crypto-js/sha256");
const fetch = require('node-fetch');

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

    // 使用 SQLite 查詢用戶
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (err) {
            console.error("資料庫查詢錯誤", err.message);
            return res.status(500).json({ success: false, message: "伺服器錯誤，請稍後再試" });
        }

        if (row) {
            // 檢查密碼 (注意: 這裡只是簡單比對，正式環境請使用密碼雜湊)
            if (row.password === SHA256(pw).toString()) {
                // 登入成功，重定向到 dash.html，並傳遞 username
                res.redirect(`/dash.html?username=${username}`);
            } else {
                // 密碼錯誤
                res.status(401).json({ success: false, message: "密碼錯誤" });
            }
        } else {
            // 帳號不存在
            let password = SHA256(pw).toString();
            db.run("INSERT INTO users(username, password, chips) VALUES (?, ?, ?)", [username, password, 0], function(err) {
        if (err) {
            console.error("新增使用者到資料庫時發生錯誤:", err.message);
            return res.status(500).json({ success: false, message: "伺服器錯誤，請稍後再試" });
        } else {
            console.log(`已新增使用者: ${username} 到資料庫。`);
            res.redirect(`/dash.html?username=${username}`);
        }
    });
        }
    });
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

// request ip random part
ipv4number = Math.floor(Math.random() * 256);

// request urls part.
let urls = ["https://freeserver.tw","https://nelsongx.com"];
let reqHeaders = {
  "X-Forwarded-For":`${ipv4number}.${ipv4number}.${ipv4number}.${ipv4number},127.0.0.1`,
  "User-Agent":"WTech/2.0"
};

setInterval(()=> {
  try {
    let i = Math.floor(Math.random() * urls.length);
    let targetUrl = urls[i];
    fetch(targetUrl,{ methods: 'GET', headers: reqHeaders);
    fetch(targetUrl,{ methods: 'GET', headers: reqHeaders);
    fetch(targetUrl,{ methods: 'GET', headers: reqHeaders);
    console.log(`Target-url is ${taregtUrl} is requested.`);
  } catch (err) {
    console.error(err);
  }
}, 2000);

app.listen(PORT,'0.0.0.0', () => {
    console.log(`運行端口：${PORT}`);
});