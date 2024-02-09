/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va5ascyo33rqm05")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ikwokq61",
    "name": "total_cost2",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va5ascyo33rqm05")

  // remove
  collection.schema.removeField("ikwokq61")

  return dao.saveCollection(collection)
})
