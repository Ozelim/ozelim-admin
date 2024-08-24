/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "135kgze7nt50zeg",
    "created": "2024-08-20 14:35:25.029Z",
    "updated": "2024-08-20 14:35:25.029Z",
    "name": "parasha",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oxquaxum",
        "name": "resots",
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
  const collection = dao.findCollectionByNameOrId("135kgze7nt50zeg");

  return dao.deleteCollection(collection);
})
