import {
  AllowNull,
  AutoIncrement,
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
export default class UserModel extends Model<UserModel> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public override id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  login: string

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string

  @AllowNull(false)
  @Column(DataType.STRING)
  avatar: string

  @Column(DataType.STRING)
  theme: Theme | undefined
}
