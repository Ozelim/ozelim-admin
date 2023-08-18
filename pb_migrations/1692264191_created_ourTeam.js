migrate((db) => {
  const collection = new Collection({
    "id": "x6of4es9fbxw1gh",
    "created": "2023-08-17 09:23:11.533Z",
    "updated": "2023-08-17 09:23:11.533Z",
    "name": "ourTeam",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7aebaqx0",
        "name": "image",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
        }
      },
      {
        "system": false,
        "id": "h3nkpjer",
        "name": "name",
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
        "id": "5vavtdqs",
        "name": "description",
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
  const collection = dao.findCollectionByNameOrId("x6of4es9fbxw1gh");

  return dao.deleteCollection(collection);
})
