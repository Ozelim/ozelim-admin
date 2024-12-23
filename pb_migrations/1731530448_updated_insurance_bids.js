/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ifumlno5det2pnk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hamcwfxa",
    "name": "status",
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
  const collection = dao.findCollectionByNameOrId("ifumlno5det2pnk")

  // remove
  collection.schema.removeField("hamcwfxa")

  return dao.saveCollection(collection)
})
