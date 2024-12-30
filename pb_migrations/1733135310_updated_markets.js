/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aaa82jdyzs4zdch")

  // remove
  collection.schema.removeField("nkmlocbv")

  // remove
  collection.schema.removeField("wqib2otu")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aaa82jdyzs4zdch")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nkmlocbv",
    "name": "additional",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wqib2otu",
    "name": "price",
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
})
