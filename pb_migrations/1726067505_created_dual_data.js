/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "9vqobhdwgthqanx",
    "created": "2024-09-11 15:11:45.750Z",
    "updated": "2024-09-11 15:11:45.750Z",
    "name": "dual_data",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "aezo8zhz",
        "name": "services",
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
  const collection = dao.findCollectionByNameOrId("9vqobhdwgthqanx");

  return dao.deleteCollection(collection);
})
