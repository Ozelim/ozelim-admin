migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rhxa53d4lrvj1rg")

  // remove
  collection.schema.removeField("rtwwrvol")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rhxa53d4lrvj1rg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rtwwrvol",
    "name": "answer",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "0",
        "1"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
