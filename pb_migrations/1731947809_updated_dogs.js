/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b2ewghzbyc577d7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "msb2fphu",
    "name": "region",
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
  const collection = dao.findCollectionByNameOrId("b2ewghzbyc577d7")

  // remove
  collection.schema.removeField("msb2fphu")

  return dao.saveCollection(collection)
})
