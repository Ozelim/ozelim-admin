migrate((db) => {
  const collection = new Collection({
    "id": "pgbcqhwgmjvuo0k",
    "created": "2023-08-08 16:57:17.104Z",
    "updated": "2023-08-08 16:57:17.104Z",
    "name": "healthBids",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4a8skpha",
        "name": "field",
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
        "name": "field1",
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
        "id": "hbmd1jrq",
        "name": "field2",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("pgbcqhwgmjvuo0k");

  return dao.deleteCollection(collection);
})
