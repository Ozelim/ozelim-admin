/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mp5y4pnylo7wt8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fk7efrcr",
    "name": "test_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "p5hav9ccusfavml",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mp5y4pnylo7wt8")

  // remove
  collection.schema.removeField("fk7efrcr")

  return dao.saveCollection(collection)
})
