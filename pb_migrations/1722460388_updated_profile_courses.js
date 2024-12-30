/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mp5y4pnylo7wt8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jdd4ausk",
    "name": "test",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mp5y4pnylo7wt8")

  // remove
  collection.schema.removeField("jdd4ausk")

  return dao.saveCollection(collection)
})
