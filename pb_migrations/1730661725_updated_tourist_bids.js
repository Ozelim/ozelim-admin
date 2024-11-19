/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w9d6k0a41vfljs1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "js2vcdai",
    "name": "comment",
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
  const collection = dao.findCollectionByNameOrId("w9d6k0a41vfljs1")

  // remove
  collection.schema.removeField("js2vcdai")

  return dao.saveCollection(collection)
})
