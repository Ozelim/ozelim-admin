migrate((db) => {
  const collection = new Collection({
    "id": "84tpe1657ct57zb",
    "created": "2023-09-15 17:09:07.128Z",
    "updated": "2023-09-15 17:09:07.128Z",
    "name": "binary2",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "m4wvw1gf",
        "name": "sponsor",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "id"
          ]
        }
      },
      {
        "system": false,
        "id": "y8vajm1h",
        "name": "children",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 2,
          "displayFields": [
            "id"
          ]
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
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("84tpe1657ct57zb");

  return dao.deleteCollection(collection);
})
