/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3326964774")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "bool256245529",
    "name": "verified",
    "presentable": false,
    "required": false,
    "system": true,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3326964774")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "bool256245529",
    "name": "verified",
    "presentable": true,
    "required": false,
    "system": true,
    "type": "bool"
  }))

  return app.save(collection)
})
