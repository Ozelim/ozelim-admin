/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2289985756")

  // add field
  collection.fields.addAt(30, new Field({
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2289985756")

  // remove field
  collection.fields.removeById("file1364667319")

  return app.save(collection)
})
