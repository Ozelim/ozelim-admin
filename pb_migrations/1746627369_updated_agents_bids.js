/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("tcv5x3s69htp52h")

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "bool2641765001",
    "name": "max",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("tcv5x3s69htp52h")

  // remove field
  collection.fields.removeById("bool2641765001")

  return app.save(collection)
})
