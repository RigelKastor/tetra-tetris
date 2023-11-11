import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Theme } from './types'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'users',
})
export class User extends Model<User> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  theme: Theme | undefined
}
