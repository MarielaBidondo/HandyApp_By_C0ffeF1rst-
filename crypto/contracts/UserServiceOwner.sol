pragma solidity ^0.4.24;
contract UserServiceOwner {

  address public owner;

  struct User {
      uint totalServices;
  }  

  struct Service {
      string name;
      uint256 price;
  }

  Service[] public services;

  mapping(address => User) public users;
  mapping(address => Service[]) public userServices;
  mapping(address => uint) public userTotalServices;
  
  event ServicePurchased(address indexed user, uint price, string service);

  constructor () public {
      owner = msg.sender;   
      services.push(Service('Bake Cake', 2 ether));
      services.push(Service('Cut Grass', 3 ether));
      services.push(Service('Clean toilet', 1 ether));
  }   

  function buyService(uint serviceIndex) public payable {
      Service storage  service = services[serviceIndex];
      require(msg.value == service.price);

      User storage user = users[msg.sender];
      user.totalServices += 1;
      userServices[msg.sender].push(service);
      userTotalServices[msg.sender] ++;

      emit ServicePurchased(msg.sender, service.price, service.name);
  }

  function totalServices() public view returns (uint) {
      return services.length;
  }

  function getUserServiceOwnerBalance() public isOwner view returns (uint) {
      address serviceOwnerAddress = this;
      return serviceOwnerAddress.balance;
  }

  modifier isOwner() {
      require(msg.sender == owner);
      _;
  }
}