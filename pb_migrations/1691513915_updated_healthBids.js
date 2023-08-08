migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pgbcqhwgmjvuo0k")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zt9o7xo9",
    "name": "number",
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
  const collection = dao.findCollectionByNameOrId("pgbcqhwgmjvuo0k")

  // remove
  collection.schema.removeField("zt9o7xo9")

  return dao.saveCollection(collection)
})
