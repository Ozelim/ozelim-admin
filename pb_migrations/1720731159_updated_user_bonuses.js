/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fp9bm2dg8loqrnu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "42pnx3y9",
    "name": "withdraws",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fp9bm2dg8loqrnu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "42pnx3y9",
    "name": "withdraw",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
