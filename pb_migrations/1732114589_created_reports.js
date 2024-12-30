/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "cjbwxhhi1n70efs",
    "created": "2024-11-20 14:56:29.628Z",
    "updated": "2024-11-20 14:56:29.628Z",
    "name": "reports",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ymvifaz7",
        "name": "agent",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "chqbwa938e4n1rd",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "axzm5wi9",
        "name": "data",
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
  const collection = dao.findCollectionByNameOrId("cjbwxhhi1n70efs");

  return dao.deleteCollection(collection);
})
