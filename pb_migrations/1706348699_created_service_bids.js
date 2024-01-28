migrate((db) => {
  const collection = new Collection({
    "id": "va5ascyo33rqm05",
    "created": "2024-01-27 09:44:59.344Z",
    "updated": "2024-01-27 09:44:59.344Z",
    "name": "service_bids",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "3nbpxj9q",
        "name": "service",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "86wgx4nnjr7xc9h",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "smkda3tx",
        "name": "status",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "created. succ",
            "rejected"
          ]
        }
      },
      {
        "system": false,
        "id": "mrlz3vpf",
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
  const collection = dao.findCollectionByNameOrId("va5ascyo33rqm05");

  return dao.deleteCollection(collection);
})
