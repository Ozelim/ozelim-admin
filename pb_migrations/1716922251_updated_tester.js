/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p5hav9ccusfavml")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vwbzjavl",
    "name": "index",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p5hav9ccusfavml")

  // remove
  collection.schema.removeField("vwbzjavl")

  return dao.saveCollection(collection)
})
