/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "x531hbroe7mhqwi",
    "created": "2024-08-17 13:08:46.780Z",
    "updated": "2024-08-17 13:08:46.780Z",
    "name": "docs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "m90v5m8s",
        "name": "1",
        "type": "file",
        "required": false,
        "presentable": false,
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
  const collection = dao.findCollectionByNameOrId("x531hbroe7mhqwi");

  return dao.deleteCollection(collection);
})
