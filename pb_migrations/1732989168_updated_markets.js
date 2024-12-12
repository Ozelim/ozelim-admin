/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aaa82jdyzs4zdch")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sxasynds",
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
        "disabled"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aaa82jdyzs4zdch")

  // remove
  collection.schema.removeField("sxasynds")

  return dao.saveCollection(collection)
})
