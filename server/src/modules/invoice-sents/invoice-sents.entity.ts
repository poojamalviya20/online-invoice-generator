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
export class InvoiceSents extends Model<InvoiceSents> {
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
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  attachment: string;
}
