migrate((db) => {
  const collection = new Collection({
    "id": "b6vkhwhjrm8sqph",
    "created": "2023-07-27 09:31:09.843Z",
    "updated": "2023-07-27 09:31:09.843Z",
    "name": "resorts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hk2lgtx3",
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
        "id": "vbfcfttg",
        "name": "duration",
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
        "id": "cesjgdxu",
        "name": "cost",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "ssu1g0tc",
        "name": "adress",
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
        "id": "phagecwq",
        "name": "region",
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
  const collection = dao.findCollectionByNameOrId("b6vkhwhjrm8sqph");

  return dao.deleteCollection(collection);
})
