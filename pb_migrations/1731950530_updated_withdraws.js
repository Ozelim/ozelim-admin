/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d8cme94imzx9wa6")

  // remove
  collection.schema.removeField("aattmqaj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s4lama50",
    "name": "dog",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "b2ewghzbyc577d7",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d8cme94imzx9wa6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aattmqaj",
    "name": "dog",
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

  // remove
  collection.schema.removeField("s4lama50")

  return dao.saveCollection(collection)
})
