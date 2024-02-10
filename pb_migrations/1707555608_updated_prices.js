/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kisvcdvr1a2ke35")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ol9azxmn",
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
  const collection = dao.findCollectionByNameOrId("kisvcdvr1a2ke35")

  // remove
  collection.schema.removeField("ol9azxmn")

  return dao.saveCollection(collection)
})
