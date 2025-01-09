/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nh9yxz4f",
    "name": "city",
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
  collection.schema.removeField("nh9yxz4f")

  return dao.saveCollection(collection)
})
