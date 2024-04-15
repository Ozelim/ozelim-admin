/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va5ascyo33rqm05")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "toftrx9d",
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
  const collection = dao.findCollectionByNameOrId("va5ascyo33rqm05")

  // remove
  collection.schema.removeField("toftrx9d")

  return dao.saveCollection(collection)
})
