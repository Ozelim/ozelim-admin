/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oatxc3dg14o3k0m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lqdlbke9",
    "name": "count",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oatxc3dg14o3k0m")

  // remove
  collection.schema.removeField("lqdlbke9")

  return dao.saveCollection(collection)
})
