/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oatxc3dg14o3k0m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ulvvb76b",
    "name": "11",
    "type": "file",
    "required": false,
    "presentable": false,
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
  collection.schema.removeField("ulvvb76b")

  return dao.saveCollection(collection)
})
