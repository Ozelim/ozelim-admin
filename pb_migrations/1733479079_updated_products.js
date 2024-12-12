/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sqgiodfz",
    "name": "market_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "aaa82jdyzs4zdch",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // remove
  collection.schema.removeField("sqgiodfz")

  return dao.saveCollection(collection)
})
