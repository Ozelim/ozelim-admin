/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d8cme94imzx9wa6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wcbtsglc",
    "name": "agent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d8cme94imzx9wa6")

  // remove
  collection.schema.removeField("wcbtsglc")

  return dao.saveCollection(collection)
})
