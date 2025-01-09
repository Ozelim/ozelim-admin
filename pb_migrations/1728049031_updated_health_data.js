/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("km9fpw4xw1ox5vg")

  // remove
  collection.schema.removeField("appsgtxg")

  // remove
  collection.schema.removeField("yhgxoomk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jqgvgu3d",
    "name": "resorts",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("km9fpw4xw1ox5vg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "appsgtxg",
    "name": "name",
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
    "id": "yhgxoomk",
    "name": "desc",
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
  collection.schema.removeField("jqgvgu3d")

  return dao.saveCollection(collection)
})
