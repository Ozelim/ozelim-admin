/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3527180448")

  // add field
  collection.fields.addAt(17, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text957004706",
    "max": 0,
    "min": 0,
    "name": "takeout_code",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3527180448")

  // remove field
  collection.fields.removeById("text957004706")

  return app.save(collection)
})
