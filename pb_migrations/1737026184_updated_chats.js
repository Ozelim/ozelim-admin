/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3861817060")

  // remove field
  collection.fields.removeById("select2375276105")

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "chqbwa938e4n1rd",
    "hidden": false,
    "id": "relation2375276105",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3861817060")

  // add field
  collection.fields.addAt(2, new Field({
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

  // remove field
  collection.fields.removeById("relation2375276105")

  return app.save(collection)
})
