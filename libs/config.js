var environment = {};

environment.staging = {
  api_url : 'http://localhost:3000',
  secrete_key : '5ECDBA38D68F4C531B1549E9CA937'
};

environment.production = {
  api_url : 'https://localhost:3000',
  secrete_key : '5ECDBA38D68F4C531B1549E9CA937'
}
var currEnv = typeof process.env.NODE_ENV == 'string' ? process.env.NODE_ENV.toLowerCase() : 'staging';

module.exports = environment[currEnv];
