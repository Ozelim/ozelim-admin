migrate((db) => {
  const collection = new Collection({
    "id": "manpz80kpdvmw0m",
    "created": "2023-08-16 15:37:50.489Z",
    "updated": "2023-08-16 15:37:50.489Z",
    "name": "transfers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "a86ftyx8",
        "name": "amount",
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
  const collection = dao.findCollectionByNameOrId("manpz80kpdvmw0m");

  return dao.deleteCollection(collection);
})
