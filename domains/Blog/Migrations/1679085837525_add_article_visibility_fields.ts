import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'blog_categories'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_visible').defaultTo(false)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('is_visible')
    })
  }
}
