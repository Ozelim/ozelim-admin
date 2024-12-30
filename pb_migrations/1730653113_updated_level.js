/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("clzdkpavhrb8t04")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jbofbphj",
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
  const collection = dao.findCollectionByNameOrId("clzdkpavhrb8t04")

  // remove
  collection.schema.removeField("jbofbphj")

  return dao.saveCollection(collection)
})
