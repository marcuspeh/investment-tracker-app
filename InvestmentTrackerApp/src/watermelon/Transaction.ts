import { Model } from '@nozbe/watermelondb'
import { date, readonly, text, field, relation } from '@nozbe/watermelondb/decorators'

export default class Transaction extends Model {
  static table = 'transaction'
  static associations = {
    financialInstrument: { type: 'belongs_to', key: 'financial_instrument_id' },
  }

  @field('quantity') quantity: number | undefined
  @field('amount_per_unit') amountPerUnit: number | undefined
  @field('commission') commission: number | undefined
  @field('is_commision_percentage') isCommissionPercentage: boolean | undefined
  @field('transaction_type') transactionType: number | undefined
  @field('transaction_date') transactionDate: number | undefined
  @text('note') note: string | undefined

  
  @relation('financialInstrument', 'financial_instrument_id') financialInstrument

  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date

  get commisionAmount() {
    if (!this.isCommissionPercentage) {
      return this.commission;
    }
  
    const commission = this.commission || 0.0
    const amountPerUnit = this.amountPerUnit || 0.0
    const quantity = this.quantity || 0.0
    return (commission / 100) * amountPerUnit * quantity;
  }

}
