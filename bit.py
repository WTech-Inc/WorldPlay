from blockcloud import Web3
from blockcloud.provider import mainNet

web3 = Web3(url=mainNet.url())

contractUI = web3.wtc.ui.complie(web3.wtc.contract({"username":"wbank","reviewer":"Ben","amount":"100"}),src="bc/contract")

if contractUI.result().text() == "Approve":
    web3.wtc.ui.render("Loading...",type="text/loader")
    web3.wait(3)
    web3.wtc.ui.close()