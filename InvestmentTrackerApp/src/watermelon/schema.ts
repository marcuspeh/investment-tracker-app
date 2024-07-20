import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const schema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'portfolio',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'financial_instrument',
      columns: [
        { name: 'portfolio_id', type: 'string' },
        { name: 'symbol', type: 'string' },
        { name: 'short_name', type: 'string' },
        { name: 'asset_type', type: 'string' },
        { name: 'exchange', type: 'string' },
        { name: 'country', type: 'string' },
        { name: 'currency', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'transaction',
      columns: [
        { name: 'financial_instrument_id', type: 'string' },
        { name: 'quantity', type: 'number' },
        { name: 'amount_per_unit', type: 'number' },
        { name: 'commission', type: 'number', isOptional: true },
        { name: 'is_commision_percentage', type: 'boolean' },
        { name: 'transaction_type', type: 'number' },
        { name: 'transaction_date', type: 'number' },
        { name: 'note', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
  ]
})