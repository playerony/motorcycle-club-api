exports.saveUserSchema = {
  "id": "/SaveUserSchema",
  "properties": {
    "username": {
      "type": "string",
      "minLength": 2,
      "maxLength": 100
    },
    "password": {
      "type": "string",
      "minLength": 6,
      "maxLength": 100
    }
  },
  "required": [
    "username", 
    "password"
  ]
};