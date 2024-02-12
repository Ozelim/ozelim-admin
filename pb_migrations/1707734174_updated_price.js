/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r16j5jh3f6ukxpm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k5ozxt2g",
    "name": "kz",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r16j5jh3f6ukxpm")

  // remove
  collection.schema.removeField("k5ozxt2g")

  return dao.saveCollection(collection)
})