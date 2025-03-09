/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // add field
  collection.fields.addAt(28, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3326964774",
    "hidden": false,
    "id": "relation1957373409",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "merchant",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // remove field
  collection.fields.removeById("relation1957373409")

  return app.save(collection)
})
