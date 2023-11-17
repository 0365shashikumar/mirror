const mPlan = require('../config/mplan.config');
const axios = require('axios');
const mplanConfig = mPlan.plan();


function getPlan(operator, circle){
   
    return new Promise((resolve, reject) => {
        
    const url = mplanConfig.url;
    const key = mplanConfig.key;

    const apiUrl = url+'plans.php?apikey='+key+'&cricle='+circle+'&operator='+operator;

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
    getPlan
};