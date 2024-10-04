/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "km9fpw4xw1ox5vg",
    "created": "2024-10-04 13:21:16.858Z",
    "updated": "2024-10-04 13:21:16.858Z",
    "name": "health_data",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "appsgtxg",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "yhgxoomk",
        "name": "desc",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("km9fpw4xw1ox5vg");

  return dao.deleteCollection(collection);
})
