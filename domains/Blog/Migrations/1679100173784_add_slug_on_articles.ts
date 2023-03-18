import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'blog_articles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('slug').notNullable().defaultTo('')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('slug')
    })
  }
}
