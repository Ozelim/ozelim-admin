/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va5ascyo33rqm05")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wkbuuydg",
    "name": "refund_data",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va5ascyo33rqm05")

  // remove
  collection.schema.removeField("wkbuuydg")

  return dao.saveCollection(collection)
})
