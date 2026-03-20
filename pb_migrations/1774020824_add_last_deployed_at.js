/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3945946014")

  collection.fields.add(new Field({
    "hidden": false,
    "id": "date1774020824",
    "name": "last_deployed_at",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3945946014")

  collection.fields.removeById("date1774020824")

  return app.save(collection)
})
