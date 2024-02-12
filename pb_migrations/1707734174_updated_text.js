/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7e2zxwmzmnxm2ai")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mjko6fts",
    "name": "headings_kz",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "20gpi8gn",
    "name": "text_kz",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7e2zxwmzmnxm2ai")

  // remove
  collection.schema.removeField("mjko6fts")

  // remove
  collection.schema.removeField("20gpi8gn")

  return dao.saveCollection(collection)
})
