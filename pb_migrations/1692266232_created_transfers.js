migrate((db) => {
  const collection = new Collection({
    "id": "infgfpgco9il8jr",
    "created": "2023-08-17 09:57:12.245Z",
    "updated": "2023-08-17 09:57:12.245Z",
    "name": "transfers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qp0vypkm",
        "name": "userId",
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
        "id": "tbwtexeu",
        "name": "amount",
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
  const collection = dao.findCollectionByNameOrId("infgfpgco9il8jr");

  return dao.deleteCollection(collection);
})
