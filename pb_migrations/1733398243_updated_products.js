/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fwjrexyz",
    "name": "category",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kkrt70ir",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "created",
        "confirmed",
        "rejected"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // remove
  collection.schema.removeField("fwjrexyz")

  // remove
  collection.schema.removeField("kkrt70ir")

  return dao.saveCollection(collection)
})
