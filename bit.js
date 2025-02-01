const { Web3, getHtml } = require("blockcloud");
const express = require("express");

const web3 = new Web3(host="127.0.0.1",port=5000);
const app = new express();
console.log(web3.wtc.block.count)

app.get((req,res)=>{
  let user = req.query.username;
  if (!user || user==null) {
    res.send("Cannot find username");
  }
  let contract = web3.wtc.web.contract({username:user,reviewer:"wbank",amount:"100"})
  res.send(getHtml(contract,src="bc/contrract-sdk"))
});

app.listen((5000,'127.0.0.1'), ()=> {
  console.log("Listen on port 5000");
});