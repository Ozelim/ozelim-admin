migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r16j5jh3f6ukxpm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wydd1qrw",
    "name": "type",
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
  const collection = dao.findCollectionByNameOrId("r16j5jh3f6ukxpm")

  // remove
  collection.schema.removeField("wydd1qrw")

  return dao.saveCollection(collection)
})
