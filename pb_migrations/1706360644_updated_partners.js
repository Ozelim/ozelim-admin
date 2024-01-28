migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ty023348izzzjbo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5i1viv5d",
    "name": "kz",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ty023348izzzjbo")

  // remove
  collection.schema.removeField("5i1viv5d")

  return dao.saveCollection(collection)
})
