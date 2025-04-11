/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("chqbwa938e4n1rd")

  // add field
  collection.fields.addAt(33, new Field({
    "hidden": false,
    "id": "date3925028244",
    "max": "",
    "min": "",
    "name": "company_date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("chqbwa938e4n1rd")

  // remove field
  collection.fields.removeById("date3925028244")

  return app.save(collection)
})
