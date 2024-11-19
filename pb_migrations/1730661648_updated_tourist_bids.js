/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w9d6k0a41vfljs1")

  // remove
  collection.schema.removeField("kwh0civ4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8os7atfn",
    "name": "status",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
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

  // remove
  collection.schema.removeField("8os7atfn")

  return dao.saveCollection(collection)
})
