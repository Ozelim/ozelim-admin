migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pgbcqhwgmjvuo0k");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "pgbcqhwgmjvuo0k",
    "created": "2023-08-08 16:57:17.104Z",
    "updated": "2023-08-28 07:31:27.607Z",
    "name": "healthBids",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4a8skpha",
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
        "id": "cz8u3vnn",
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
        "id": "zt9o7xo9",
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
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
