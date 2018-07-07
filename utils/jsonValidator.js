var Validator = require('jsonschema').Validator;
var v = new Validator();

exports.validateSchema = function(req, schema) {
  let result = v.validate(req, schema);
  let errors = result.errors;
  let list = [];

  for(let i=0 ; i<errors.length ; i++) {
    list.push({
      property: errors[i].property,
      message: errors[i].message
    });
  }

  return list;
}