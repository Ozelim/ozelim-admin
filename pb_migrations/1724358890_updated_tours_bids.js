/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a65qie5ktgdyp1t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rvooscio",
    "name": "resort",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a65qie5ktgdyp1t")

  // remove
  collection.schema.removeField("rvooscio")

  return dao.saveCollection(collection)
})
