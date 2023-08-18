migrate((db) => {
  const collection = new Collection({
    "id": "d8cme94imzx9wa6",
    "created": "2023-08-18 11:19:27.419Z",
    "updated": "2023-08-18 11:19:27.419Z",
    "name": "withdraws",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wsbhmaek",
        "name": "owner",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "cqumf7ei",
        "name": "sum",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ifdm52oy",
        "name": "card",
        "type": "text",
        "required": false,
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
  const collection = dao.findCollectionByNameOrId("d8cme94imzx9wa6");

  return dao.deleteCollection(collection);
})
