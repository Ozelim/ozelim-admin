/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3326964774")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "bool7569730",
    "name": "duken",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3326964774")

  // remove field
  collection.fields.removeById("bool7569730")

  return app.save(collection)
})
