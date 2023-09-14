migrate((db) => {
  const collection = new Collection({
    "id": "od25rnktb4uc8yt",
    "created": "2023-09-14 15:23:17.612Z",
    "updated": "2023-09-14 15:23:17.612Z",
    "name": "level",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "x3twvevg",
        "name": "level",
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
        "id": "3xw9oyau",
        "name": "new_level",
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
        "id": "tothk3kb",
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
  const collection = dao.findCollectionByNameOrId("od25rnktb4uc8yt");

  return dao.deleteCollection(collection);
})
