const sms = () => {
    
    const obj = {};
    obj.username="GLOBAL2020"; 
    obj.password="Mallglobe@789"; 
    obj.senderid="GLAPVT"; 
    obj.messagetype="N"; 
    obj.sms_url="http://sms.vipswallet.com/WebserviceSMS.aspx"; 
    obj.company="From Mirror Global";
     
    return obj;

}

module.exports = {
    sms
}