/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("chqbwa938e4n1rd")

  // remove
  collection.schema.removeField("cieoeqsa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "leh15dhn",
    "name": "avatar",
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
  const collection = dao.findCollectionByNameOrId("chqbwa938e4n1rd")

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

  // remove
  collection.schema.removeField("leh15dhn")

  return dao.saveCollection(collection)
})
