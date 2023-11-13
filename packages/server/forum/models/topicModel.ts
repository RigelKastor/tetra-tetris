import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

import CommentModel from './commentModel'
import UserModel from './userModel'
import { TopicReaction } from './reactions'

@Table({
  timestamps: true,
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

  @ForeignKey(() => UserModel)
  @Column(DataType.UUIDV4)
  uid: number

  @AllowNull(false)
  @Column(DataType.STRING)
  body: string

  @HasMany(() => CommentModel, 'topic_id')
  comments: Comment[] | undefined

  @HasMany(() => TopicReaction, 'topic_id')
  reactions: TopicReaction[] | undefined
}
