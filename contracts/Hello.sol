pragma solidity ^0.4.20;

contract HelloWorld {

  string public helloWorld;
  uint public changedCount;

  constructor() public {
    helloWorld = "Hello World";
    changedCount = 0;
  }

  event makeEvent(string indexed _helloWorld);

  function make(string _helloWorld ) public {
    helloWorld = _helloWorld;
    changedCount++;
    emit makeEvent(_helloWorld);
  }

  function get() public view returns (string) {
    return helloWorld;
  }
}
