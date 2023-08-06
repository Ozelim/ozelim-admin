migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dohznrx4zqairb8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mrliwfr7",
    "name": "sponsor",
    "type": "relation",
    "required": true,
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "waail0fy",
    "name": "b1",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eipaoazq",
    "name": "b2",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 4,
      "displayFields": [
        "id"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5vhyvuss",
    "name": "b3",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 8,
      "displayFields": [
        "id"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rvegqiaf",
    "name": "b4",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 16,
      "displayFields": [
        "id"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ph7aglks",
    "name": "b5",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 32,
      "displayFields": [
        "id"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmpmfjxr",
    "name": "b6",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 64,
      "displayFields": [
        "id"
      ]
    }
  }))

  // update
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
        "id"
      ]
    }
  }))

  // update
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
        "id"
      ]
    }
  }))

  // update
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
        "id"
      ]
    }
  }))

  // update
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
        "id"
      ]
    }
  }))

  // update
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
        "id"
      ]
    }
  }))

  // update
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
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dohznrx4zqairb8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mrliwfr7",
    "name": "sponsor",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "email"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "waail0fy",
    "name": "b1",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 2,
      "displayFields": [
        "email"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eipaoazq",
    "name": "b2",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 4,
      "displayFields": [
        "email"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5vhyvuss",
    "name": "b3",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 8,
      "displayFields": [
        "email"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rvegqiaf",
    "name": "b4",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 16,
      "displayFields": [
        "email"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ph7aglks",
    "name": "b5",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 32,
      "displayFields": [
        "email"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmpmfjxr",
    "name": "b6",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 64,
      "displayFields": [
        "email"
      ]
    }
  }))

  // update
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

  // update
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

  // update
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

  // update
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

  // update
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

  // update
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
})
