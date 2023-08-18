migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rhxa53d4lrvj1rg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vqkrrp1c",
    "name": "answer",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rhxa53d4lrvj1rg")

  // remove
  collection.schema.removeField("vqkrrp1c")

  return dao.saveCollection(collection)
})
