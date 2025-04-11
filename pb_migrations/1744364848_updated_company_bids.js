/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_721797366")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "file1364667319",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "docs",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_721797366")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "file1364667319",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "docs",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
