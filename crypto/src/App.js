import React, { Component } from "react";
import Panel from "./Panel";
import getWeb3 from "./getWeb3";
import UserServiceOwnerContract from "./UserServiceOwner";
import { HandyTransact } from "./HandyTransact";
import { ToastContainer } from "react-toastr";

const converter = (web3) => {
    //in order to get a more friendly value for the user
    //1 eth = 1exp18 wei
    return (value) => {
        return web3.utils.fromWei(value.toString(), 'ether');
    }
}

export class App extends Component {

    constructor(props) {
        super(props);
       this.state = {
           //we difine situation initial, till is execute
           balance: 0,
           account: undefined,
           services: [],
           userServices: []
       };
    }
//It will allow us to work with last version of web3
      //Once that the component has been mount we will execute the account
async componentDidMount() {
    //We generate instance in the component 
    this.web3 = await getWeb3();
    //testing web3 version console.log(this.web3.version);
    this.toEther = converter(this.web3);
    //getWeb3() it will be sure that we have metamask as extension in our browser
    this.UserServiceOwner = await UserServiceOwnerContract(this.web3.currentProvider);
    //Give us the account that we are working on.
    var account = (await this.web3.eth.getAccounts())[0];
    //Checking account 
    console.log("This is the actual account: " + account);
    
    //With this method we can get notify one someone hire our revice
    //Or if we offer the service we get the confirmation of the transaction
    let serviceHired= this.UserServiceOwner.ServicePurchased();
    serviceHired.watch(function (err, result) {

    const { user, price, service } = result.args;

    if (user === this.state.account) {
       console.log(`You hired  ${service} service with a cost of ${price}`);
     } else {
       this.container.success(`Last user hired ${service} service
       with a cost of ${price}`, 'Service information');
    }

    }.bind(this));

    this.HandyTransact = new HandyTransact(this.UserServiceOwner);

    //This it will update our page any time that we want to change our account
    this.web3.currentProvider.publicConfigStore.on('update', async function (event) {
    this.setState({
    //We get the account from our Metamask in Lower Case and from Web3 in Capital letters
    //Then in order to have compatibility we use the funtionality toLowerCAse
        account: event.selectedAddress.toLowerCase()
    }, () => {
    //Once that we have our account we give initalization to our appliction
        this.load();
    });
    }.bind(this));
    //Call back method that save our state
    this.setState({
    //Async method that it wil pass our account to lower case (metaMask and Web3 compatibility)    
    account: account.toLowerCase()
    }, () => {
        this.load();
    });
    }

  //Method to hire Service
    async buyService(serviceIndex, service) {
        await this.HandyTransact.buyService(
        serviceIndex,
        this.state.account,
        service.price
        );
    }

 //Method where are going to be our components
    async load() {
        this.getBalance();
        this.getServices();
        this.getUserServices();
    }

    //Method to get our account balance
    async getBalance() {
        // set the account as the current account
        let weiBalance = await this.web3.eth.getBalance(this.state.account);
        this.setState({
        //store the balance
        balance: this.toEther(weiBalance)
    });}

    //Method to get Services availables that we have stored in our mapping 
    async getServices() {
        let services = await this.HandyTransact.getServices();
        this.setState({
        services
        });
     }

    //  Method to get Services hired from the user
    async getUserServices() {
        let userServices = await this.HandyTransact.getUserServices(this.state.account);
        this.setState({
        userServices
        });
    }

  //Method to buy Service
    async buyService(serviceIndex, service) {
        await this.HandyTransact.buyService(
        serviceIndex,
        this.state.account,
        service.price
        );
}

//Our app it wil refresh any time that we have update with render     
    render() {
        return <React.Fragment>
            <div className="jumbotron">
                <h4 className="display-4">Transactions with HandyTokens </h4>
            </div>

            <div className="row">
            <div> {/* we call balance of our account */}</div>
                <div className="col-sm">
                    <Panel title="Balance">
                    <div> {/* we call the balance on the account */}</div>
                        <p><strong>{this.state.account}</strong></p>
                        <span><strong> Balance of HandyTokens </strong>: {this.state.balance}</span>
                    </Panel>
                </div>
               
            </div>
            <div className="row">
            <div> {/* we call all the services, and set button with the action to hire service */}</div>
                <div className="col-sm">
                    <Panel title="Services Availables">
                    {this.state.services.map((service, i) => {
                            return <div key={i}>
                                <span>{service.name} - cost: {this.toEther(service.price)}</span>
                                <button className="btn" onClick={() => this.buyService(i, service)}> Hire </button>                               
                            </div>
                        })}

                    </Panel>
                </div>
                <div className="col-sm">
                <div> {/* we call the services hired with the account */}</div>
                    <Panel title="Your services">
                    {this.state.userServices.map((service, i) => {
                            return <div key={i}>
                                {service.name} - cost: {service.price}
                            </div>
                        })}
                    </Panel>
                </div>
            </div>
            <ToastContainer ref={(input) => this.container = input}
                className="toast-top-right" />
        </React.Fragment>
    }
}
