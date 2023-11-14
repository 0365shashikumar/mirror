const rechargeModule = require('../config/recharge.config');
const axios = require('axios');
const crypto = require('crypto');
const pbmsConfig = rechargeModule.pbms();

function pbms(requestId, operatorId, mobile_no, ConsumerNumber, amount ) {

    const url = pbmsConfig.url;
    if(ConsumerNumber !== null){
        url += "&OperatorID="+operatorId+"&APIUserRequestID="+requestId+"&ConsumerNumber="+ConsumerNumber+"&Amount="+amount+"";
    }else{
        url += "&OperatorID="+operatorId+"&APIUserRequestID="+requestId+"&ConsumerNumber="+mobile_no+"&Amount="+amount+"";
    }
    return axios.get(url);

}


module.exports = {
    pbms
};