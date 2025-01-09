/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aaa82jdyzs4zdch")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "skimg6mb",
    "name": "products",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "i1m42vdwdgx7m1q",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aaa82jdyzs4zdch")

  // remove
  collection.schema.removeField("skimg6mb")

  return dao.saveCollection(collection)
})
