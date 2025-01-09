/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("135kgze7nt50zeg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oxquaxum",
    "name": "resorts",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("135kgze7nt50zeg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oxquaxum",
    "name": "resots",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
