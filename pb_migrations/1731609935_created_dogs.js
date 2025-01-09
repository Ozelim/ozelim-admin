/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "b2ewghzbyc577d7",
    "created": "2024-11-14 18:45:35.291Z",
    "updated": "2024-11-14 18:45:35.291Z",
    "name": "dogs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ep7ey8sk",
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
  const collection = dao.findCollectionByNameOrId("b2ewghzbyc577d7");

  return dao.deleteCollection(collection);
})
