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
export class UserAgentInvoices extends Model<UserAgentInvoices> {
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  uuid: UUID;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_agent_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  invoice_id: number;
}
