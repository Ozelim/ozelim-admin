/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6vkhwhjrm8sqph")

  // remove
  collection.schema.removeField("qieelnie")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "olgdfvts",
    "name": "diseas",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tknkzj39",
    "name": "signed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6vkhwhjrm8sqph")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qieelnie",
    "name": "diseas",
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
  collection.schema.removeField("olgdfvts")

  // remove
  collection.schema.removeField("tknkzj39")

  return dao.saveCollection(collection)
})
