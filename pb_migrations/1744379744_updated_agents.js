/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("chqbwa938e4n1rd")

  // add field
  collection.fields.addAt(34, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3568518349",
    "max": 0,
    "min": 0,
    "name": "company_pack",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("chqbwa938e4n1rd")

  // remove field
  collection.fields.removeById("text3568518349")

  return app.save(collection)
})
