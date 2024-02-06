/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va5ascyo33rqm05")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sul1m8vz",
    "name": "total_cost",
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
  collection.schema.removeField("sul1m8vz")

  return dao.saveCollection(collection)
})
