/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mp5y4pnylo7wt8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uhxe0mlp",
    "name": "img",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mp5y4pnylo7wt8")

  // remove
  collection.schema.removeField("uhxe0mlp")

  return dao.saveCollection(collection)
})
