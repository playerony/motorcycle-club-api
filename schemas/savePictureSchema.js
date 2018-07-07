exports.savePictureSchema = {
  "id": "/SavePictureSchema",
  "properties": {
    "title": {
      "type": "string",
      "maxLength": 100
    },
    "description": {
      "type": "string",
      "maxLength": 1000
    },
    "location": {
      "type": "string",
      "maxLength": 1000
    },
    "folderId": {
      "type": "integer"
    },
    "userId": {
      "type": "integer"
    },
  },
  "required": [
    "title", 
    "description", 
    "location", 
    "folderId",
    "userId"
  ]
};