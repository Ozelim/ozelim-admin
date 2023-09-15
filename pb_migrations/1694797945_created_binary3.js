migrate((db) => {
  const collection = new Collection({
    "id": "0abcz02faf4exva",
    "created": "2023-09-15 17:12:25.792Z",
    "updated": "2023-09-15 17:12:25.792Z",
    "name": "binary3",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mwccccl0",
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
        "id": "wsrxmq6y",
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
  const collection = dao.findCollectionByNameOrId("0abcz02faf4exva");

  return dao.deleteCollection(collection);
})
