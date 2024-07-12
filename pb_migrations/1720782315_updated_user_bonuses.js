/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fp9bm2dg8loqrnu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3kgrsxnb",
    "name": "services",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fp9bm2dg8loqrnu")

  // remove
  collection.schema.removeField("3kgrsxnb")

  return dao.saveCollection(collection)
})
