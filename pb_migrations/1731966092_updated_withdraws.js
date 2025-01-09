/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d8cme94imzx9wa6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "13itvsfk",
    "name": "city",
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
  const collection = dao.findCollectionByNameOrId("d8cme94imzx9wa6")

  // remove
  collection.schema.removeField("13itvsfk")

  return dao.saveCollection(collection)
})
