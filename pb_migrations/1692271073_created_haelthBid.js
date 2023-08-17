migrate((db) => {
  const collection = new Collection({
    "id": "zn1r4xgc0fkv5tu",
    "created": "2023-08-17 11:17:53.130Z",
    "updated": "2023-08-17 11:17:53.130Z",
    "name": "haelthBid",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bicaiiuj",
        "name": "email",
        "type": "email",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "gw2iif8w",
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
        "id": "6nv0jpwn",
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
  const collection = dao.findCollectionByNameOrId("zn1r4xgc0fkv5tu");

  return dao.deleteCollection(collection);
})
