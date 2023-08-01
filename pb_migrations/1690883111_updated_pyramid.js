migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dohznrx4zqairb8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gs8wa2yo",
    "name": "b7",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 128,
      "displayFields": [
        "email"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qepao6oo",
    "name": "b8",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 256,
      "displayFields": [
        "email"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0l5tog59",
    "name": "b9",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 512,
      "displayFields": [
        "email"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mreaj5p9",
    "name": "b10",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1024,
      "displayFields": [
        "email"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fgnt6pnk",
    "name": "b11",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 2048,
      "displayFields": [
        "email"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yhno0qws",
    "name": "b12",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 4096,
      "displayFields": [
        "email"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dohznrx4zqairb8")

  // remove
  collection.schema.removeField("gs8wa2yo")

  // remove
  collection.schema.removeField("qepao6oo")

  // remove
  collection.schema.removeField("0l5tog59")

  // remove
  collection.schema.removeField("mreaj5p9")

  // remove
  collection.schema.removeField("fgnt6pnk")

  // remove
  collection.schema.removeField("yhno0qws")

  return dao.saveCollection(collection)
})
