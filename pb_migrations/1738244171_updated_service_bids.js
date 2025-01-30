/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("va5ascyo33rqm05")

  // add field
  collection.fields.addAt(17, new Field({
    "hidden": false,
    "id": "json2937935784",
    "maxSize": 0,
    "name": "costs",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("va5ascyo33rqm05")

  // remove field
  collection.fields.removeById("json2937935784")

  return app.save(collection)
})
