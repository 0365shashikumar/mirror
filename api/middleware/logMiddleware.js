const { connect } = require('../config/db.config');
const logMiddleware = (req, res, next) => {

  //console.log(connect())
  const db = connect();

   //onsole.log(db.log);

	const { method, original_url } = req;
	 let responseSent = false;
   
	 const originalJson = res.json;
   
	 res.json = function (data) {
	   if (!responseSent) {
		 responseSent = true;
		const status = res.statusCode;
		const success = status >= 200 && status < 400;
		const response_message = success ? 'Success' : 'Failure';
		const response_body = JSON.stringify(req.body);
		const response_header = JSON.stringify(res._headers);
		const request_body = JSON.stringify(req.body);
		const request_header = JSON.stringify(req.headers);
     

     const logdata={method,original_url,status,success,response_message,response_header,response_body,request_body,request_header};
     console.log(logdata);
     try{
     console.log('-created log');

      db.log.create(logdata);
     }catch(err){
          console.log('-error while create');
      console.log(err);

     }

    
    }
   
	   originalJson.call(this, data); // Call the original res.json method
	 };
   
	 next();
   };
   
   module.exports = logMiddleware;