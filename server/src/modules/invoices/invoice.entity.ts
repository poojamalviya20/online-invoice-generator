import { UUID } from 'crypto';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { InvoiceItems } from '../invoice-items/invoice-items.entity';

@Table
export class Invoice extends Model<Invoice> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  uuid: UUID;

  @Column({
    type: DataType.CHAR(11),
    allowNull: false,
  })
  invoice_number: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: false,
  })
  invoice_from: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: true,
  })
  logo: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  due_date: Date;

  @Column({
    type: DataType.CHAR(55),
    allowNull: true,
  })
  payment_terms: string;

  @Column({
    type: DataType.CHAR(55),
    allowNull: true,
  })
  po_number: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: false,
  })
  billing_to_name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  billing_address: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: true,
  })
  shipping_to_name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  shipping_address: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  notes: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  terms: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  subtotal: number;

  @Column({
    type: DataType.CHAR(4),
    allowNull: false,
  })
  currency_code: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  discount: number;

  @Column({
    type: DataType.ENUM,
    values: ['FLAT', 'PERCENTAGE'],
    allowNull: true,
  })
  discount_option: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  tax: number;

  @Column({
    type: DataType.ENUM,
    values: ['FLAT', 'PERCENTAGE'],
    allowNull: true,
  })
  tax_option: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  shipping_charge: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  total_amount: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  paid_amount: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  due_amount: number;

  @HasMany(() => InvoiceItems)
  items: InvoiceItems;
}
