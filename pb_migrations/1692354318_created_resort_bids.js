migrate((db) => {
  const collection = new Collection({
    "id": "gvn9s6cbp9p3263",
    "created": "2023-08-18 10:25:17.716Z",
    "updated": "2023-08-18 10:25:17.716Z",
    "name": "resort_bids",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nsuyynj3",
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
        "id": "i4mncwmj",
        "name": "phone",
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
        "id": "4xnowcbn",
        "name": "resort",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "b6vkhwhjrm8sqph",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "id"
          ]
        }
      },
      {
        "system": false,
        "id": "7f35zzqk",
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
  const collection = dao.findCollectionByNameOrId("gvn9s6cbp9p3263");

  return dao.deleteCollection(collection);
})
