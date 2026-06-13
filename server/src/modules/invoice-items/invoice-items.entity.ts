import { UUID } from 'crypto';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Invoice } from '../invoices/invoice.entity';

@Table
export class InvoiceItems extends Model<InvoiceItems> {
    @Column({ 
        type: DataType.UUID, 
        allowNull: true 
      })
      uuid: UUID;
    
      @Column({ 
        type: DataType.CHAR(255), 
        allowNull: true 
      })
      product_name: string;
    
      @Column({ 
        type: DataType.INTEGER, 
        allowNull: true 
      })
      quantity: number;
    
      @Column({ 
        type: DataType.DOUBLE, 
        allowNull: true 
      })
      rate_amount: number;
    
      @Column({ 
        type: DataType.DOUBLE, 
        allowNull: true 
      })
      total_amount: number;

      @ForeignKey(() => Invoice)
      @Column({
          type: DataType.INTEGER,
          allowNull: false,
      })
      invoice_id: number;

      @BelongsTo(() => Invoice)
      invoice: Invoice;

}
