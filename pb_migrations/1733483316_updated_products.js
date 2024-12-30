/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ii1nr3tv",
    "name": "sub_category",
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
  const collection = dao.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // remove
  collection.schema.removeField("ii1nr3tv")

  return dao.saveCollection(collection)
})
