/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "a65qie5ktgdyp1t",
    "created": "2024-08-21 18:32:53.462Z",
    "updated": "2024-08-21 18:32:53.462Z",
    "name": "tours_bids",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mv3fmhia",
        "name": "date_picked",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "24kqtyun",
        "name": "category",
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
        "id": "ewivxeoa",
        "name": "adults",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "nvupwwfe",
        "name": "child",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "bfyalqjv",
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
  const collection = dao.findCollectionByNameOrId("a65qie5ktgdyp1t");

  return dao.deleteCollection(collection);
})
