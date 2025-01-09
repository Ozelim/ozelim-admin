/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("chqbwa938e4n1rd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "36ghm20s",
    "name": "agent_date",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("chqbwa938e4n1rd")

  // remove
  collection.schema.removeField("36ghm20s")

  return dao.saveCollection(collection)
})
