/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("aaa82jdyzs4zdch")

  // remove field
  collection.fields.removeById("a6n98cgk")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("aaa82jdyzs4zdch")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "a6n98cgk",
    "maxSelect": 99,
    "maxSize": 5242880,
    "mimeTypes": [
      "image/png",
      "image/jpeg"
    ],
    "name": "images",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  return app.save(collection)
})
