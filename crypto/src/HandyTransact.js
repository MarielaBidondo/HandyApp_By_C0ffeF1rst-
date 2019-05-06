export class HandyTransact {
    constructor(contract) {
        //contract that interact with the app
        this.contract = contract;
    }
    //Method to buyService defined in our contract already
    async buyService(serviceIndex, from, value) {
        return this.contract.buyService(serviceIndex, { from, value });
    }
   //Method to get all services
    async getServices() {
        let total = await this.getTotalServices();
        let services = [];
        for (var i = 0; i < total; i++) {
            let service = await this.contract.services(i);
            services.push(service);
        }

        return this.mapServices(services);
    }
    //Method to get services from the account in use
    async getUserServices(account) {
   
        let userTotalServices = await this.contract.userTotalServices(account);
        //empty array to insert services
        let services = [];
        //Getting services
        for (var i = 0; i < userTotalServices.toNumber(); i++) {
            let service = await this.contract.userServices(account, i);
            services.push(service);
        }
        //we display services
        return this.mapServices(services);
    }

    async getTotalServices() {
        return (await this.contract.totalServices()).toNumber();
    }
    //mapping all services
    mapServices(services) {
        return services.map(service => {
            return {
                name: service[0],
                price: service[1].toNumber()
            }
        });
    }
}