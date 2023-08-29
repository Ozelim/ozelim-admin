migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sjiq6j6mn8hpwwj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3k4rooza",
    "name": "data",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sjiq6j6mn8hpwwj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3k4rooza",
    "name": "rest",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
