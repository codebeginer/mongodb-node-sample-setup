var mongoose = require('mongoose');

var a = new mongoose.Schema({
  designation : {
    type : 'string', // admin,manager
    default : 'manager'
  },
  name : {
    type : 'string',
    required : true
  },
  email : {
    type : 'string',
    required : true,
    unique: true,
    minlength: 1,
    trim : true
  },
  password : {
    type : 'string',
    default : helper.password('123456')
  },
  contact_number : {
    type : 'number',
    default : 0
  },
  status : {
    type : 'string',
    default : 'active' // active, suspended
  },
  created_at : {
    type : 'date',
    default : Date.now()
  },
  updated_at : {
    type : 'date',
    default : null
  },
  access_roles : {
    users : {
      type : 'number',
      default : 0
    }
  }
})

var m = new mongoose.model('staff',a);

module.exports = m;
