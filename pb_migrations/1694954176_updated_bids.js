migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sjiq6j6mn8hpwwj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cye2s4b2",
    "name": "admin",
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
  const collection = dao.findCollectionByNameOrId("sjiq6j6mn8hpwwj")

  // remove
  collection.schema.removeField("cye2s4b2")

  return dao.saveCollection(collection)
})
