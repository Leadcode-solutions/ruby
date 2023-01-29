import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'image_realisation'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('image_id')
        .references('id')
        .inTable('images')
        .onDelete('CASCADE')
      table.string('realisation_id')
        .references('id')
        .inTable('realisations')
        .onDelete('CASCADE')

      table.unique(['image_id', 'realisation_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
