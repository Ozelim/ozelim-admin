migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rhxa53d4lrvj1rg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ugvet45i",
    "name": "count",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rhxa53d4lrvj1rg")

  // remove
  collection.schema.removeField("ugvet45i")

  return dao.saveCollection(collection)
})
