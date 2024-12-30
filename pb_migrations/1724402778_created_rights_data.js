/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "i16774i388lmhsd",
    "created": "2024-08-23 08:46:18.984Z",
    "updated": "2024-08-23 08:46:18.984Z",
    "name": "rights_data",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cngd3ah0",
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
  const collection = dao.findCollectionByNameOrId("i16774i388lmhsd");

  return dao.deleteCollection(collection);
})
