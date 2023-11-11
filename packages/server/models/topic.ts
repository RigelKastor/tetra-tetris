import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Comment } from './comment'

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'topics',
})
export class Topic extends Model<Topic> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  topic_id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  theme!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  topic_starter!: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  topic_starter_id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  body!: string

  @HasMany(() => Comment, 'topic_id')
  comments: Comment[] | undefined
}
