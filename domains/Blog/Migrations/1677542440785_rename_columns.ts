import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'blog_articles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('category_id', 'blog_category_id')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('blog_category_id', 'category_id')
    })
  }
}
