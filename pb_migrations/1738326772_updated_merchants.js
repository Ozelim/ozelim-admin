/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3326964774")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "bool3651516835",
    "name": "posted",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3326964774")

  // remove field
  collection.fields.removeById("bool3651516835")

  return app.save(collection)
})
