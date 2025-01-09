/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fp9bm2dg8loqrnu",
    "created": "2024-07-11 20:52:29.019Z",
    "updated": "2024-07-11 20:52:29.019Z",
    "name": "user_bonuses",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bwbcwejz",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "0hxnl1fr",
        "name": "referals",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "42pnx3y9",
        "name": "withdraw",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "8f4xt5kf",
        "name": "transfers",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("fp9bm2dg8loqrnu");

  return dao.deleteCollection(collection);
})
