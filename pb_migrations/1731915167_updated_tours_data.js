/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qrancpvczsq0d4j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mgr6xk8l",
    "name": "tours_bid",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qrancpvczsq0d4j")

  // remove
  collection.schema.removeField("mgr6xk8l")

  return dao.saveCollection(collection)
})
