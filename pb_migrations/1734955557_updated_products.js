/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // add field
  collection.fields.addAt(17, new Field({
    "hidden": false,
    "id": "date4183970445",
    "max": "",
    "min": "",
    "name": "updated_date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // remove field
  collection.fields.removeById("date4183970445")

  return app.save(collection)
})
