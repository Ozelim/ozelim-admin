/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kkbpmw22ias2t87")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4jp0fcla",
    "name": "comment",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kkbpmw22ias2t87")

  // remove
  collection.schema.removeField("4jp0fcla")

  return dao.saveCollection(collection)
})
