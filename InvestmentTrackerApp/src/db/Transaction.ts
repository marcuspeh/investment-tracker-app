import { Model } from '@nozbe/watermelondb'
import { date, readonly, text, field, relation } from '@nozbe/watermelondb/decorators'

export default class Transaction extends Model {
  static table = 'transaction'
  static associations = {
    financialInstrument: { type: 'belongs_to', key: 'financial_instrument_id' },
  }

  @text('quantity') quantity
  @text('amount_per_unit') amountPerUnit
  @field('commission') commission
  @field('is_commision_percentage') isCommissionPercentage
  @field('transaction_type') transactionType
  @field('transaction_date') transactionDate
  @text('note') note

  
  @relation('financialInstrument', 'financial_instrument_id') financialInstrument

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt

  get commisionAmount() {
    if (!this.isCommissionPercentage) {
      return this.commission;
    }
    return (this.commission / 100) * this.amountPerUnit * this.quantity;
  }
}
