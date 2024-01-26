migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ormk8mhzypabbbf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tybarz8l",
    "name": "kz",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ormk8mhzypabbbf")

  // remove
  collection.schema.removeField("tybarz8l")

  return dao.saveCollection(collection)
})
