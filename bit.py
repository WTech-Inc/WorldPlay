from blockcloud import Web3
from blockcloud.provider import mainNet
from j import complie

web3 = Web3(url="https://mainnet.bangjjn.net:5009")

jCode = """
  import com.net.wcoins.Contract;
  public static void start() {
    //add-string-array
    String <> data = InForm.get("msgData");
    Contract contract = new Contract(data);
    contract.showScreen();
  }
"""

contract = web3.wtc.complie(complie(jCode),src="bc/J-lang",parms={"msgData":{"username":"Ben","reviewer":"wtech","amount":"100"}})