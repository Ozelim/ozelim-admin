migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("od25rnktb4uc8yt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eslwljde",
    "name": "status",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "created",
        "succ"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("od25rnktb4uc8yt")

  // remove
  collection.schema.removeField("eslwljde")

  return dao.saveCollection(collection)
})
