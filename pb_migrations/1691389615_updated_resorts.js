migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6vkhwhjrm8sqph")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmn29smy",
    "name": "status",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "bomj",
        "good"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6vkhwhjrm8sqph")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmn29smy",
    "name": "status",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "bomj",
        "good"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
