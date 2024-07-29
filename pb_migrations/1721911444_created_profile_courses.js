/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2mp5y4pnylo7wt8",
    "created": "2024-07-25 12:44:04.581Z",
    "updated": "2024-07-25 12:44:04.581Z",
    "name": "profile_courses",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "shstwcmy",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "h1wxxjay",
        "name": "lessons",
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
  const collection = dao.findCollectionByNameOrId("2mp5y4pnylo7wt8");

  return dao.deleteCollection(collection);
})
