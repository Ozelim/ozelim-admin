/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("chqbwa938e4n1rd")

  // add field
  collection.fields.addAt(26, new Field({
    "hidden": false,
    "id": "json3832111349",
    "maxSize": 0,
    "name": "favorites",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("chqbwa938e4n1rd")

  // remove field
  collection.fields.removeById("json3832111349")

  return app.save(collection)
})
