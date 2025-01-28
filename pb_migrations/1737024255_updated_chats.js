/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3861817060")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select2375276105",
    "maxSelect": 1,
    "name": "user",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "agents"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3861817060")

  // remove field
  collection.fields.removeById("select2375276105")

  return app.save(collection)
})
