migrate((db) => {
  const collection = new Collection({
    "id": "wdshc53pt3fl118",
    "created": "2023-08-23 09:57:52.533Z",
    "updated": "2023-08-23 09:57:52.533Z",
    "name": "price",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hzbwlhzw",
        "name": "title",
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
        "id": "rkqzrlev",
        "name": "cost",
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
  const collection = dao.findCollectionByNameOrId("wdshc53pt3fl118");

  return dao.deleteCollection(collection);
})
