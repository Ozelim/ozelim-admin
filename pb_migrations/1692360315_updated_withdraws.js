migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d8cme94imzx9wa6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "seediqz8",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d8cme94imzx9wa6")

  // remove
  collection.schema.removeField("seediqz8")

  return dao.saveCollection(collection)
})
