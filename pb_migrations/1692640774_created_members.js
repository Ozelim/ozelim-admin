migrate((db) => {
  const collection = new Collection({
    "id": "80blg2z40iyzsts",
    "created": "2023-08-21 17:59:34.258Z",
    "updated": "2023-08-21 17:59:34.258Z",
    "name": "members",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zq9nq8on",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "cv2hau5x",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "eqowvdan",
        "name": "image",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("80blg2z40iyzsts");

  return dao.deleteCollection(collection);
})
