import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'blog_articles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('draft_is_active').defaultTo(false)
      table.string('draft_password')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('draft_is_active', 'draft_password')
    })
  }
}
