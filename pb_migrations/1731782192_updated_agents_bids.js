/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcv5x3s69htp52h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "unt2x7pp",
    "name": "comment",
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
  const collection = dao.findCollectionByNameOrId("tcv5x3s69htp52h")

  // remove
  collection.schema.removeField("unt2x7pp")

  return dao.saveCollection(collection)
})
