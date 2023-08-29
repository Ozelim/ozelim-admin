migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ormk8mhzypabbbf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x9vuhwb7",
    "name": "link",
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
  const collection = dao.findCollectionByNameOrId("ormk8mhzypabbbf")

  // remove
  collection.schema.removeField("x9vuhwb7")

  return dao.saveCollection(collection)
})
