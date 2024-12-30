/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("chqbwa938e4n1rd")

  // remove
  collection.schema.removeField("atn0rfe6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cieoeqsa",
    "name": "avatar",
    "type": "email",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "otjjbepk",
    "name": "referals",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "chqbwa938e4n1rd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("chqbwa938e4n1rd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "atn0rfe6",
    "name": "level",
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
  collection.schema.removeField("cieoeqsa")

  // remove
  collection.schema.removeField("otjjbepk")

  return dao.saveCollection(collection)
})
