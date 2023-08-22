migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ty023348izzzjbo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wdzafcel",
    "name": "pdf",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ty023348izzzjbo")

  // remove
  collection.schema.removeField("wdzafcel")

  return dao.saveCollection(collection)
})
