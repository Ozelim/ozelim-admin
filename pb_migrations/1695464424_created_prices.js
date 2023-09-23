migrate((db) => {
  const collection = new Collection({
    "id": "154ve8kdx0z0clc",
    "created": "2023-09-23 10:20:24.894Z",
    "updated": "2023-09-23 10:20:24.894Z",
    "name": "prices",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "unoffujt",
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
        "id": "d5edmlmg",
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
      },
      {
        "system": false,
        "id": "fpysjrsl",
        "name": "text",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("154ve8kdx0z0clc");

  return dao.deleteCollection(collection);
})
