migrate((db) => {
  const collection = new Collection({
    "id": "crqqvpk5n7i5mif",
    "created": "2023-08-04 06:14:36.229Z",
    "updated": "2023-08-04 06:14:36.229Z",
    "name": "utils",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ndsmt82o",
        "name": "regions",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "xebbceud",
        "name": "diseases",
        "type": "json",
        "required": false,
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
  const collection = dao.findCollectionByNameOrId("crqqvpk5n7i5mif");

  return dao.deleteCollection(collection);
})
