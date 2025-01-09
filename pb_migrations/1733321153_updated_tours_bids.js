/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a65qie5ktgdyp1t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vdna3brv",
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
  const collection = dao.findCollectionByNameOrId("a65qie5ktgdyp1t")

  // remove
  collection.schema.removeField("vdna3brv")

  return dao.saveCollection(collection)
})
