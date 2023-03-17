import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'blog_articles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('published_at')
      table.text('image')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('published_at', 'image')
    })
  }
}
