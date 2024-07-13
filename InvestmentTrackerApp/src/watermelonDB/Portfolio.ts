import { Model } from '@nozbe/watermelondb'
import { date, readonly, text, children, writer  } from '@nozbe/watermelondb/decorators'

export default class Portfolio extends Model {
  static table = 'portfolios'
  static associations = {
    financialInstrucments: { type: 'has_many', foreignKey: 'portfolio_id' },
  }

  @text('title') title: string | undefined
  @text('description') description: string | undefined

  @children('financialInstrucments') financialInstrucments

  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date

  @writer async updateTitle(title: string) {
    await this.update(portfolio => {
      portfolio.title = title
    })
  }

  @writer async updateDescription(description: string) {
    await this.update(portfolio => {
      portfolio.description = description
    })
  }
}
