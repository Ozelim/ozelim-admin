/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("135kgze7nt50zeg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sgorv4bt",
    "name": "card",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("135kgze7nt50zeg")

  // remove
  collection.schema.removeField("sgorv4bt")

  return dao.saveCollection(collection)
})
