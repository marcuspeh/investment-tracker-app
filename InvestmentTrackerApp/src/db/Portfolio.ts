import { Model } from '@nozbe/watermelondb'
import { date, readonly, text, children } from '@nozbe/watermelondb/decorators'

export default class Portfolio extends Model {
  static table = 'portfolios'
  static associations = {
    financialInstrucments: { type: 'has_many', foreignKey: 'portfolio_id' },
  }

  @text('name') name
  @text('description') description

  @children('financialInstrucments') financialInstrucments

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
