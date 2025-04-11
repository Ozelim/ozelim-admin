/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2289985756")

  // add field
  collection.fields.addAt(31, new Field({
    "hidden": false,
    "id": "bool1337919823",
    "name": "company",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2289985756")

  // remove field
  collection.fields.removeById("bool1337919823")

  return app.save(collection)
})
