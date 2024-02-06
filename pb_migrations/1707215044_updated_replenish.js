/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g66y0dzxf5hfitk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "63mckevx",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "created",
        "paid"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g66y0dzxf5hfitk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "63mckevx",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "created",
        "succ",
        "waiting",
        "rejected"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
