/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w9d6k0a41vfljs1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kwh0civ4",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w9d6k0a41vfljs1")

  // remove
  collection.schema.removeField("kwh0civ4")

  return dao.saveCollection(collection)
})
