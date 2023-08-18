migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rhxa53d4lrvj1rg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vfvyd1ob",
    "name": "illness",
    "type": "text",
    "required": false,
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
  const collection = dao.findCollectionByNameOrId("rhxa53d4lrvj1rg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vfvyd1ob",
    "name": "1",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
