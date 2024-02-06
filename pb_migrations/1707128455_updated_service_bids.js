/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va5ascyo33rqm05")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "smkda3tx",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "waiting",
        "created",
        "succ",
        "rejected"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va5ascyo33rqm05")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "smkda3tx",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "created",
        "succ",
        "rejected"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
