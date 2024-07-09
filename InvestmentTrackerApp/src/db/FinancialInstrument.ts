import { Model } from '@nozbe/watermelondb'
import { date, readonly, text, relation, children } from '@nozbe/watermelondb/decorators'

export default class FinancialInstrument extends Model {
  static table = 'financial_instrument'
  static associations = {
    portfolio: { type: 'belongs_to', foreignKey: 'portfolio_id' },
    transactions: { type: 'has_many', key: 'financial_instrument_id' }
  }

  @text('symbol') symbol
  @text('short_name') shortName
  @text('asset_type') assetType
  @text('exchange') exchange
  @text('country') country
  @text('currency') currency
  
  @relation('portfolio', 'portfolio_id') portfolio
  @children('transactions') transactions

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
