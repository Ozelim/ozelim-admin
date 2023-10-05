migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sjiq6j6mn8hpwwj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vyl5k28p",
    "name": "status",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "created",
        "succ"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sjiq6j6mn8hpwwj")

  // remove
  collection.schema.removeField("vyl5k28p")

  return dao.saveCollection(collection)
})
