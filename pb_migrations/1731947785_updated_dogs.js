/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b2ewghzbyc577d7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f95p1ybr",
    "name": "iin",
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
    "id": "mhzpq5jy",
    "name": "iban",
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
  collection.schema.removeField("f95p1ybr")

  // remove
  collection.schema.removeField("mhzpq5jy")

  return dao.saveCollection(collection)
})
