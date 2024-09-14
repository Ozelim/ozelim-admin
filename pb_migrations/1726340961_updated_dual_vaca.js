/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hvz5katc3l1ggp7")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "atfepawa",
    "name": "vacas",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hvz5katc3l1ggp7")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "atfepawa",
    "name": "vaca",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
