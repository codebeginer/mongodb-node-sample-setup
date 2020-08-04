var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mongodb_node_sample',{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

module.exports = {mongoose};
