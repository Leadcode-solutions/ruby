import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'blog_categories'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('icon').alter()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('icon').alter()
    })
  }
}
