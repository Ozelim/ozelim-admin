migrate((db) => {
  const collection = new Collection({
    "id": "x7glx5z3xv1fq5d",
    "created": "2023-08-30 10:31:06.625Z",
    "updated": "2023-08-30 10:31:06.625Z",
    "name": "Binary",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "b7fkaql6",
        "name": "children",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("x7glx5z3xv1fq5d");

  return dao.deleteCollection(collection);
})
