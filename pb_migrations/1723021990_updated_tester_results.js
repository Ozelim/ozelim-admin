/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nq3lsrjpiyr3xt0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kphv1jva",
    "name": "index",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nq3lsrjpiyr3xt0")

  // remove
  collection.schema.removeField("kphv1jva")

  return dao.saveCollection(collection)
})
