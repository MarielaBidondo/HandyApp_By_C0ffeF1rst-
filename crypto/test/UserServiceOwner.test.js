const UserServiceOwner = artifacts.require('UserServiceOwner');

let instance;

beforeEach(async () => {
    instance = await UserServiceOwner.new();
});

//We will validate that we have services to hire before to be possible the transaction
contract('UserServiceOwner', accounts => {
    it('should have available services', async () => {
        let total = await instance.totalServices();
        assert(total > 0);
    });

    //If the user select a service and is able to provide this amount should be able to hire the service
    it('should allow customers to buy a service providing its value', async () => {
    
        let service = await instance.services(0);
        let serviceName = service[0], price = service[1];

        await instance.buyService(0, { from: accounts[0], value: price});
        let userService = await instance.userServices(accounts[0], 0);
        let userTotalServices = await instance.userTotalServices(accounts[0]);

        assert(userService[0], serviceName);
        assert(userService[1], price);
        assert(userTotalServices , 1);
    });

    //The service should not be hire by the user if this one doesn't have enough tokens
    it('should not allow user to buy service under the price', async () => {   
        let service = await instance.services(0);
        let price = service[1] - 500;
        try {
            await instance.buyService(0, { from: accounts[0], value: price });
        }
        catch (e) { return; }
        assert.fail();
    });

  //The balance of the contract has to be update, if we buy a service has to be reflected in the final balance
    it('should get the real balance of the contract', async() => {

        let service = await instance.services(0);
        let price = service[1];

        let service2 = await instance.services(1);
        let price2 = service2[1];

        await instance.buyService(0, { from: accounts[0], value: price});
        await instance.buyService(1, { from: accounts[0], value: price2});

        let newUserServiceOwnerBalance = await instance.getUserServiceOwnerBalance()

        assert.equal(newUserServiceOwnerBalance.toNumber(), price.toNumber() + price2.toNumber());
    });
});