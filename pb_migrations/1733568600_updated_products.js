/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aow6suxl",
    "name": "agent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "chqbwa938e4n1rd",
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
  collection.schema.removeField("aow6suxl")

  return dao.saveCollection(collection)
})
