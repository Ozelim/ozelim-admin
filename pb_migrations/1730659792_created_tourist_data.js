/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ojwichjfvffrnu9",
    "created": "2024-11-03 18:49:52.824Z",
    "updated": "2024-11-03 18:49:52.824Z",
    "name": "tourist_data",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sflsb3vk",
        "name": "types",
        "type": "json",
        "required": false,
        "presentable": false,
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
  const collection = dao.findCollectionByNameOrId("ojwichjfvffrnu9");

  return dao.deleteCollection(collection);
})
