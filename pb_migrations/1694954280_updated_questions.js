migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rhxa53d4lrvj1rg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3lrthjea",
    "name": "status",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "created",
        "succ",
        "fall"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rhxa53d4lrvj1rg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3lrthjea",
    "name": "status_",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "created",
        "succ",
        "fall"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
