migrate((db) => {
  const collection = new Collection({
    "id": "51spmfphzqc5upz",
    "created": "2023-09-04 14:15:55.890Z",
    "updated": "2023-09-04 14:15:55.890Z",
    "name": "price_duplicate",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "11gdunnf",
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
        "id": "uexb1skk",
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
  const collection = dao.findCollectionByNameOrId("51spmfphzqc5upz");

  return dao.deleteCollection(collection);
})
