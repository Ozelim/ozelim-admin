/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "kkrt70ir",
    "maxSelect": 1,
    "name": "status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "created",
      "moderation",
      "confirmed",
      "rejected"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "kkrt70ir",
    "maxSelect": 1,
    "name": "status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "created",
      "confirmed",
      "rejected"
    ]
  }))

  return app.save(collection)
})
