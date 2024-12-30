/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r9wpdl2bslrl1rg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ibr2rvxd",
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
  const collection = dao.findCollectionByNameOrId("r9wpdl2bslrl1rg")

  // remove
  collection.schema.removeField("ibr2rvxd")

  return dao.saveCollection(collection)
})
