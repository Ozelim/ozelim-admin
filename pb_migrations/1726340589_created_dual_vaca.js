/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hvz5katc3l1ggp7",
    "created": "2024-09-14 19:03:09.706Z",
    "updated": "2024-09-14 19:03:09.706Z",
    "name": "dual_vaca",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "atfepawa",
        "name": "vaca",
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
  const collection = dao.findCollectionByNameOrId("hvz5katc3l1ggp7");

  return dao.deleteCollection(collection);
})
