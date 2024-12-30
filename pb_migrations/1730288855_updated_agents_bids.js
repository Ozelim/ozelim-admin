/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcv5x3s69htp52h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i4k0ryt4",
    "name": "agent",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcv5x3s69htp52h")

  // remove
  collection.schema.removeField("i4k0ryt4")

  return dao.saveCollection(collection)
})
