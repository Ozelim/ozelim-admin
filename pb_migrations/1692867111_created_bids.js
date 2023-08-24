migrate((db) => {
  const collection = new Collection({
    "id": "sjiq6j6mn8hpwwj",
    "created": "2023-08-24 08:51:51.877Z",
    "updated": "2023-08-24 08:51:51.877Z",
    "name": "bids",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oksviqgi",
        "name": "name",
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
        "id": "y0f85geq",
        "name": "email",
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
        "id": "06zwythp",
        "name": "phone",
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
  const collection = dao.findCollectionByNameOrId("sjiq6j6mn8hpwwj");

  return dao.deleteCollection(collection);
})
