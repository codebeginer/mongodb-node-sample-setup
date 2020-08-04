var mongoose = require('mongoose');

var Users = new mongoose.Schema({
  first_name : {
    type: 'string',
    required : true
  },
  last_name : {
    type : 'string',
  },
  email : {
    type : 'string',
    required : true
  },
  password : {
    type : 'string',
    required : true
  },
  dob : {
    type : 'Date',
    default : '1990-01-01'
  },
  gender : {
    type : 'string',
    default : 'male'
  },
  contact_number : {
    type : 'number',
    default : '0'
  },
  address : {
    type : 'string',
    default : ''
  },
  country_id : {
    type : 'string',
    default : '123'
  },
  state_id : {
    type : 'string',
    default : '1'
  },
  is_activated : {
    type : 'number',
    default : 0
  },
  status : {
    type : 'string', // registered, active, suspended
    default : 'registered'
  },
  membership : {
    type : 'array'
  },
  device_id : {
    type : 'string',
    default : ''
  },
  created_by : {
    type : 'string',
    default : ''
  },
  created_at : {
    type : 'number'
  },
  updated_at : {
    type : 'number'
  }
})

var UserModel = new mongoose.model('user',Users)

module.exports = UserModel;
