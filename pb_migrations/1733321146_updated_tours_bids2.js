/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ds5ydvq6ouvrmsq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1i3nra7z",
    "name": "status",
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
  const collection = dao.findCollectionByNameOrId("ds5ydvq6ouvrmsq")

  // remove
  collection.schema.removeField("1i3nra7z")

  return dao.saveCollection(collection)
})
