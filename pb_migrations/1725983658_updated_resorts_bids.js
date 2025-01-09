/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gvn9s6cbp9p3263")

  // remove
  collection.schema.removeField("z5slbfi6")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gvn9s6cbp9p3263")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z5slbfi6",
    "name": "date_picked",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
