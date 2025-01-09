/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("chqbwa938e4n1rd")

  // remove
  collection.schema.removeField("otjjbepk")

  // remove
  collection.schema.removeField("9ibtrqdb")

  // remove
  collection.schema.removeField("leh15dhn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "udewfbd1",
    "name": "phone",
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
  const collection = dao.findCollectionByNameOrId("chqbwa938e4n1rd")

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9ibtrqdb",
    "name": "agent",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

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

  // remove
  collection.schema.removeField("udewfbd1")

  return dao.saveCollection(collection)
})
