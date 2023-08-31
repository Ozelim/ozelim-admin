migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x7glx5z3xv1fq5d")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b7fkaql6",
    "name": "children",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 2,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x7glx5z3xv1fq5d")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b7fkaql6",
    "name": "referals",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 2,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
