import { UUID } from 'crypto';
import {
  Table,
  Column,
  Model,
  DataType
} from 'sequelize-typescript';

@Table
export class UserAgent extends Model<UserAgent> {
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  uuid: UUID;

  @Column({
    type: DataType.CHAR(255),
    allowNull: true,
  })
  ip: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  user_agent: JSON;
  
}


