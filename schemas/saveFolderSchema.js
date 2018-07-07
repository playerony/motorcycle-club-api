exports.saveFolderSchema = {
  "id": "/SaveFolderSchema",
  "properties": {
    "title": {
      "type": "string",
      "minLength": 2,
      "maxLength": 50
    },
    "description": {
      "type": "string",
      "minLength": 2,
      "maxLength": 50
    },
    "userId": {
      "type": "integer"
    },
  },
  "required": [
    "title", 
    "description", 
    "userId"
  ]
};