import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Comment } from './comment'
import { TopicReaction } from './reactions'

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'topics',
})
export class Topic extends Model<Topic> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  override id: number

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

  @HasMany(() => TopicReaction, 'topic_id')
  reactions: TopicReaction[] | undefined
}
