const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const logger = require('./api/logger/api.logger');
//const graphqlApp = require('./api/controller/graphql.js');
const helmet = require('helmet');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const allowedOrigin = 'https://mirror.org.in'; //domain

// CORS options
const corsOptions = {
  origin: allowedOrigin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204, // For preflight requests
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

/*app.use(cors({
    origin: '*'
}));
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));*/


app.use(
  helmet({
    contentSecurityPolicy: false, 
	xssFilter: {
      setOnOldIE: true, // Set this to true if you need to support old versions of IE
    },
    XXSSProtection:{ setHeader: false }
  
  })
);
app.use(express.json());

const port = process.env.PORT || 3001;
/*const redis=require('redis');
let redisPort=6379;
let redisHost="127.0.0.1";
const client=redis.createClient({
   socket:{
       port:redisPort,
       host:redisHost
   }
});

(async()=>{
    console.log('redis connected')
    await client.connect()
})();
*/

// const users = require('./api/router/users/users');
// app.use('/api/users', users);

const pincode = require('./api/router/pincode/pincode');
app.use('/api/pincode', pincode);

const countries = require('./api/router/countries/countries');
app.use('/api/countries', countries);

const state = require('./api/router/state/state');
app.use('/api/state', state);

const city = require('./api/router/city/city');
app.use('/api/city', city);


const otp = require('./api/router/otp/otp');
app.use('/api/otp', otp);

const rechargeServices = require('./api/router/recharge/services');
app.use('/api/rechage', rechargeServices);

const serviceOperator = require('./api/router/operator/operator');
app.use('/api/rechage', serviceOperator);


const rechargeServicesOperator = require('./api/router/recharge/serviceOperator');
app.use('/api/rechage', rechargeServicesOperator);

const address = require('./api/router/address/address');
app.use('/api/address', address);

const rechargeServicesDiscount = require('./api/router/recharge/rechargeServiceDiscount');
app.use('/api/rechage', rechargeServicesDiscount);


const recharge = require('./api/router/recharge/recharge');
app.use('/api/recharge', recharge);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});