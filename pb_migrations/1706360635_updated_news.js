migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfu89j20g87db7m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n4vfqkuz",
    "name": "kz",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfu89j20g87db7m")

  // remove
  collection.schema.removeField("n4vfqkuz")

  return dao.saveCollection(collection)
})
