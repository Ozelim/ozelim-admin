migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6vkhwhjrm8sqph")

  // remove
  collection.schema.removeField("r9itxkq6")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6vkhwhjrm8sqph")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r9itxkq6",
    "name": "description",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
