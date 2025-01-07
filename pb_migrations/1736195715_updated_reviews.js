/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4163081445")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "file2325845965",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "pics",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4163081445")

  // remove field
  collection.fields.removeById("file2325845965")

  return app.save(collection)
})
