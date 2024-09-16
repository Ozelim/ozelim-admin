/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zjly75aojd1g7pu",
    "created": "2024-09-16 20:32:25.209Z",
    "updated": "2024-09-16 20:32:25.209Z",
    "name": "insurance_data",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "32sxdsfp",
        "name": "types",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("zjly75aojd1g7pu");

  return dao.deleteCollection(collection);
})
