/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "m363j26byirg7ur",
    "created": "2024-11-18 07:17:46.192Z",
    "updated": "2024-11-18 07:17:46.192Z",
    "name": "home_dara",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cv6d82gd",
        "name": "services",
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
  const collection = dao.findCollectionByNameOrId("m363j26byirg7ur");

  return dao.deleteCollection(collection);
})
