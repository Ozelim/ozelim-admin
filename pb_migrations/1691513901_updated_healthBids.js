migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pgbcqhwgmjvuo0k")

  // remove
  collection.schema.removeField("hbmd1jrq")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pgbcqhwgmjvuo0k")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hbmd1jrq",
    "name": "number",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
