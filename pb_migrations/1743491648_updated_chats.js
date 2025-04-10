/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3861817060")

  // remove field
  collection.fields.removeById("json3674349206")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3861817060")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "json3674349206",
    "maxSize": 0,
    "name": "messages",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
