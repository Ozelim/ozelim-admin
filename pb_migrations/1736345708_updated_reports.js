/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("cjbwxhhi1n70efs")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json2876557598",
    "maxSize": 0,
    "name": "dates",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("cjbwxhhi1n70efs")

  // remove field
  collection.fields.removeById("json2876557598")

  return app.save(collection)
})
