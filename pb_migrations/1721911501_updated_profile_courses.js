/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mp5y4pnylo7wt8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2knwwpyg",
    "name": "description",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mp5y4pnylo7wt8")

  // remove
  collection.schema.removeField("2knwwpyg")

  return dao.saveCollection(collection)
})
