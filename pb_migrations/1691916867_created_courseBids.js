migrate((db) => {
  const collection = new Collection({
    "id": "w65l3lx0ttyt57p",
    "created": "2023-08-13 08:54:27.013Z",
    "updated": "2023-08-13 08:54:27.013Z",
    "name": "courseBids",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lbpvznhr",
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
        "id": "tyutvlia",
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
        "id": "8o2vn2wr",
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
  const collection = dao.findCollectionByNameOrId("w65l3lx0ttyt57p");

  return dao.deleteCollection(collection);
})
