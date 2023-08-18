migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r9wpdl2bslrl1rg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qdbp89aj",
    "name": "taker",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r9wpdl2bslrl1rg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qdbp89aj",
    "name": "reciever",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
