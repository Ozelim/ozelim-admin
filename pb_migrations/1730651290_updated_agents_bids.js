/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcv5x3s69htp52h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ua5vyitr",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "paid",
        "waiting",
        "rejected"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcv5x3s69htp52h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ua5vyitr",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "paid",
        "rejected"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
