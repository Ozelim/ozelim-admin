migrate((db) => {
  const collection = new Collection({
    "id": "kl701hjycwqwzzd",
    "created": "2023-08-17 10:35:48.516Z",
    "updated": "2023-08-17 10:35:48.516Z",
    "name": "withdraw",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zuntllt1",
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
        "id": "k403lg1p",
        "name": "amount",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "h3gmupkg",
        "name": "card",
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
  const collection = dao.findCollectionByNameOrId("kl701hjycwqwzzd");

  return dao.deleteCollection(collection);
})
