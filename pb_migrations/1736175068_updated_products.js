/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // remove field
  collection.fields.removeById("b5gwqd4x")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // add field
  collection.fields.addAt(13, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "b5gwqd4x",
    "max": 0,
    "min": 0,
    "name": "additional",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
