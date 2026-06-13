import { UUID } from 'crypto';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table
export class InvoiceAnalytics extends Model<InvoiceAnalytics> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  uuid: UUID;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  invoice_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue : 0
  })
  download_count: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue : 0
  })
  sent_over_mail_count: number;
}
