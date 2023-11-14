const pbms = () => {
    
    const obj = {};
    obj.username="9096608606"; 
    obj.pin="5128"; 
    obj.token="e253543683804910b2aa"; 
    obj.url="https://api.payboombiz.com/RechargeAPI/v1/GetRecharge?Mobile="+obj.username+"&APIToken="+obj.token+"&Pin="+obj.pin+""; 
    obj.company="From Mirror Global";
     
    return obj;

}

module.exports = {
    pbms
}