exports.saveRoleSchema = {
  "id": "/SaveRoleSchema",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 2,
      "maxLength": 30
    }
  },
  "required": [
    "name"
  ]
};