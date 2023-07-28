migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oatxc3dg14o3k0m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xydkutgn",
    "name": "images",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 99,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oatxc3dg14o3k0m")

  // remove
  collection.schema.removeField("xydkutgn")

  return dao.saveCollection(collection)
})
