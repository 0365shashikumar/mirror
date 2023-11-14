
/*
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Set up Sequelize connection
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'mayway_inrexpert',
  password: 'Is#JGAU+wOGY',
  database: 'mayway_inrexpert',
  pool: {
    max: 5, // Maximum number of connection instances
    min: 0, // Minimum number of connection instances
    acquire: 30000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000 // Maximum time, in milliseconds, that a connection can be idle before being released
  }
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnection();
/*
app.get('/redis', (req, res) => {
 
const queryParams = req.query;
const redisKey = generateRedisKey(req,queryParams);

client.get(redisKey).then((data)=>{

if(data){

res.json(JSON.parse(data));
}else{

let datas={'status':200,'message':'first time data'}
// Store the data in Redis cache
client.set(redisKey, JSON.stringify(datas));
// Set an expiration time for the cached data if needed
client.expire(redisKey, 604800); // Expire after 1 hour

// Return the data to the client
res.json(datas);
//}).catch((err)=>{ res.status(500).json({error:err})})
}

}).catch(err=>{console.log('error from redis')});


   
});

function generateRedisKey(req,queryParams) {
  // Generate a unique Redis key based on the dynamic query parameters
  // Customize this logic based on your specific requirements
  const keys = Object.keys(queryParams).sort();
  const redisKeyParts = keys
    .filter((key) => queryParams[key]) // Exclude query parameters with empty values
    .map((key) => `${key}:${queryParams[key]}`);

const urlKey = encodeURIComponent(req.originalUrl); // Encode the URL component
    const redisKey = `${urlKey}:${redisKeyParts.join(':')}`;
    return redisKey;
 
}
*/

app.get('/export', (req, res) => {
  res.send('public_html/projects/nodejsproject:export PATH=/opt/cpanel/ea-nodejs16/bin:$PATH');
});