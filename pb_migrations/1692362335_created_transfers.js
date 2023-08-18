migrate((db) => {
  const collection = new Collection({
    "id": "r9wpdl2bslrl1rg",
    "created": "2023-08-18 12:38:55.406Z",
    "updated": "2023-08-18 12:38:55.406Z",
    "name": "transfers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cdaaku4l",
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
        "id": "qdbp89aj",
        "name": "reciever",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "33ubdvgg",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("r9wpdl2bslrl1rg");

  return dao.deleteCollection(collection);
})
