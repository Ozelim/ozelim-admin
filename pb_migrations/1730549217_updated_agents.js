/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("chqbwa938e4n1rd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i4y7whjo",
    "name": "sponsor",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "chqbwa938e4n1rd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("chqbwa938e4n1rd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i4y7whjo",
    "name": "sponer",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "chqbwa938e4n1rd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
