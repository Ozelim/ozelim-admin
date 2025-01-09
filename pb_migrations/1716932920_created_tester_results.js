/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "nq3lsrjpiyr3xt0",
    "created": "2024-05-28 21:48:40.740Z",
    "updated": "2024-05-28 21:48:40.740Z",
    "name": "tester_results",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dc6jq6kr",
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
        "id": "xb5x6ayl",
        "name": "phone",
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
        "id": "dv9z31mk",
        "name": "results",
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
  const collection = dao.findCollectionByNameOrId("nq3lsrjpiyr3xt0");

  return dao.deleteCollection(collection);
})
