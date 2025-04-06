/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // remove field
  collection.fields.removeById("json3243999128")

  // remove field
  collection.fields.removeById("file1342769062")

  // remove field
  collection.fields.removeById("json3005059407")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // add field
  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "json3243999128",
    "maxSize": 0,
    "name": "p_updated",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(13, new Field({
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

  // add field
  collection.fields.addAt(16, new Field({
    "hidden": false,
    "id": "json3005059407",
    "maxSize": 0,
    "name": "p_saved",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
