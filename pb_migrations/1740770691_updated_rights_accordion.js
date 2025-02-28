/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1167232875")

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4219498712",
    "max": 0,
    "min": 0,
    "name": "label_kz",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "json3316042122",
    "maxSize": 0,
    "name": "description_kz",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1167232875")

  // remove field
  collection.fields.removeById("text4219498712")

  // remove field
  collection.fields.removeById("json3316042122")

  return app.save(collection)
})
