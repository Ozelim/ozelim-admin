/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // update field
  collection.fields.addAt(16, new Field({
    "hidden": false,
    "id": "file1342769062",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "pics_updated",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // update field
  collection.fields.addAt(16, new Field({
    "hidden": false,
    "id": "file1342769062",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "pics_updated",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
