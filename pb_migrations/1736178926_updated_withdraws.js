/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("d8cme94imzx9wa6")

  // remove field
  collection.fields.removeById("xt0ej0ig")

  // add field
  collection.fields.addAt(13, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2792535308",
    "max": 0,
    "min": 0,
    "name": "iin",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("d8cme94imzx9wa6")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "xt0ej0ig",
    "max": null,
    "min": null,
    "name": "iin",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("text2792535308")

  return app.save(collection)
})
