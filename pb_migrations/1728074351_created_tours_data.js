/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qrancpvczsq0d4j",
    "created": "2024-10-04 20:39:11.970Z",
    "updated": "2024-10-04 20:39:11.970Z",
    "name": "tours_data",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ealotfpc",
        "name": "tours",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("qrancpvczsq0d4j");

  return dao.deleteCollection(collection);
})
