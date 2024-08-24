/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x531hbroe7mhqwi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bhnuzlrr",
    "name": "5",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x531hbroe7mhqwi")

  // remove
  collection.schema.removeField("bhnuzlrr")

  return dao.saveCollection(collection)
})
