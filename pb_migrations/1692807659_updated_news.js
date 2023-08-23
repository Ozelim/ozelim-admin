migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfu89j20g87db7m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u2lu3z2o",
    "name": "avatar",
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
  const collection = dao.findCollectionByNameOrId("bfu89j20g87db7m")

  // remove
  collection.schema.removeField("u2lu3z2o")

  return dao.saveCollection(collection)
})
