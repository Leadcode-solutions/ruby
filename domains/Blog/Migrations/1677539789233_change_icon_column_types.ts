import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'blog_categories'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('icon')
      table.text('icon')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('icon')
      table.string('icon')
    })
  }
}
