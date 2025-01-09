/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fp9bm2dg8loqrnu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x3pr507h",
    "name": "agents",
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
  const collection = dao.findCollectionByNameOrId("fp9bm2dg8loqrnu")

  // remove
  collection.schema.removeField("x3pr507h")

  return dao.saveCollection(collection)
})
