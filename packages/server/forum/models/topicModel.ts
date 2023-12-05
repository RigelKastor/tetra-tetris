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

import CommentModel from './commentModel'
import TopicReactionModel from './reactions'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'topics',
})
export default class TopicModel extends Model<TopicModel> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public override id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  theme: string

  @Column(DataType.INTEGER)
  user_id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  body: string

  @HasMany(() => CommentModel, 'topic_id')
  comments: Comment[] | undefined

  @HasMany(() => TopicReactionModel, 'topic_id')
  reactions: TopicReactionModel[] | undefined
}
