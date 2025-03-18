/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1751747783")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "json122736735",
    "maxSize": 0,
    "name": "delivery_address",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1751747783")

  // remove field
  collection.fields.removeById("json122736735")

  return app.save(collection)
})
