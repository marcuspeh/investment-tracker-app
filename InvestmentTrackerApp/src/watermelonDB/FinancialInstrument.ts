import { Model } from '@nozbe/watermelondb'
import { date, readonly, text, relation, children } from '@nozbe/watermelondb/decorators'

export default class FinancialInstrument extends Model {
  static table = 'financial_instrument'
  static associations = {
    portfolio: { type: 'belongs_to', foreignKey: 'portfolio_id' },
    transactions: { type: 'has_many', key: 'financial_instrument_id' }
  }

  @text('symbol') symbol: string | undefined
  @text('short_name') shortName: string | undefined
  @text('asset_type') assetType: string | undefined
  @text('exchange') exchange: string | undefined
  @text('country') country: string | undefined
  @text('currency') currency: string | undefined

  @relation('portfolio', 'portfolio_id') portfolio
  @children('transactions') transactions

  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date
}
