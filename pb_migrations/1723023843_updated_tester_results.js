/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nq3lsrjpiyr3xt0")

  // remove
  collection.schema.removeField("bjxpw1gk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mt0kqz3u",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "passed",
        "failed",
        "created"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nq3lsrjpiyr3xt0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bjxpw1gk",
    "name": "passed",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "passed",
        "failed",
        "created"
      ]
    }
  }))

  // remove
  collection.schema.removeField("mt0kqz3u")

  return dao.saveCollection(collection)
})
