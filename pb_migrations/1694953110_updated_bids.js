migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sjiq6j6mn8hpwwj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jyzz253c",
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
  collection.schema.removeField("jyzz253c")

  return dao.saveCollection(collection)
})
