// Contract Abi
var contractAbi;

// Contract Address
var contractAddress = '0x65A3c7612123B218F83ADfCde2e92E2C736e9007';

//Set Ids
var submit = document.getElementById('submit');
var helloworld = document.getElementById('helloWorld');
var input = document.getElementById('fuck');

//Enables JSON
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        };
    };
    rawFile.send(null);
};

//Reads JSON file and sets abi
readTextFile("https://b3rtl.github.io/MotD/js/abi.json", function(text){
  contractAbi = JSON.parse(text);
  console.log('read abi:', contractAbi);
});


//HTML Sanitizer
function escapeHtml(unsafe) {
  return unsafe
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");
};

//Main Func
function main(contract){

  web3.eth.getCoinbase(function (error, address) {
      if (!error) {
          web3.eth.defaultAccount = address;
      } else {
        console.log(error);
      }
  });

  // Display Stored String
  contract.get(function(err, helloWorld) {
    if (err) {
      console.log(err);
      return;
    };
    console.log(helloWorld);
    helloworld.innerHTML = escapeHtml(helloWorld);
  });

  //Change the Stored String
  submit.addEventListener('click', function() {
      contract.get(function(err, helloWorld) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(helloWorld);
        helloworld.innerHTML = escapeHtml(helloWorld);
      });

      gentx = {
        "data": contract.make.getData(input.value),
        "to": contractAddress,
        "value": 0,
        "gasLimit": 90000,
        "from": web3.eth.defaultAccount,
      };
      web3.eth.sendTransaction(gentx, function(error, result){
      console.log("error:", error)
      console.log("resp: ", result)
      });
    });
}

window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name);
        window.web3 = new Web3(web3.currentProvider);

        // Set the Contract
        var contract = web3.eth.contract(contractAbi).at(contractAddress);
        main(contract);

    } else {
        // console.log('No Web3 Detected... using HTTP Provider')
        // window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        alert('Please install Metamask browser extension and connect to an Aquachain RPC');
    }

});
