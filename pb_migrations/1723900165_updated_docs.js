/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x531hbroe7mhqwi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mdapt7rh",
    "name": "page",
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
  const collection = dao.findCollectionByNameOrId("x531hbroe7mhqwi")

  // remove
  collection.schema.removeField("mdapt7rh")

  return dao.saveCollection(collection)
})
