/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("aaa82jdyzs4zdch")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "sxasynds",
    "maxSelect": 1,
    "name": "status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "created",
      "posted",
      "disabled"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("aaa82jdyzs4zdch")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "sxasynds",
    "maxSelect": 1,
    "name": "status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "created",
      "confirmed",
      "disabled"
    ]
  }))

  return app.save(collection)
})
