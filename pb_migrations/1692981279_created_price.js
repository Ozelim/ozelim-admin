migrate((db) => {
  const collection = new Collection({
    "id": "r16j5jh3f6ukxpm",
    "created": "2023-08-25 16:34:39.352Z",
    "updated": "2023-08-25 16:34:39.352Z",
    "name": "price",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sxet3urc",
        "name": "title",
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
        "id": "3lmpr3wr",
        "name": "cost",
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
  const collection = dao.findCollectionByNameOrId("r16j5jh3f6ukxpm");

  return dao.deleteCollection(collection);
})
