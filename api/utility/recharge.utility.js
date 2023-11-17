const rechargeModule = require('../config/recharge.config');
const axios = require('axios');
const crypto = require('crypto');
const pbmsConfig = rechargeModule.pbms();

function pbms(requestId, operatorId, mobile_no, ConsumerNumber, amount ) {
    
    return new Promise((resolve, reject) => {
        let apiUrl = pbmsConfig.url;
        if(ConsumerNumber !== null){
            apiUrl += "&OperatorID="+operatorId+"&APIUserRequestID="+requestId+"&ConsumerNumber="+ConsumerNumber+"&Amount="+amount+"";
        }else{
            apiUrl += "&OperatorID="+operatorId+"&APIUserRequestID="+requestId+"&ConsumerNumber="+mobile_no+"&Amount="+amount+"";
        }

        axios.get(apiUrl) 
            .then((response) => {
                resolve({ result: response.data }); 
                })
            .catch((error) => {
                console.log(error);
                reject(error); 
            });
            
    });

}


module.exports = {
    pbms
};