import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import CommentModel from './commentModel'

export type Reaction = 'like' | 'dislike'

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'topic_reactions',
})
export class TopicReactionModel extends Model<TopicReactionModel> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  override id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  reaction!: Reaction

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  topic_id!: number
}

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'comment_reactions',
})
export default class CommentReactionModel extends Model<CommentReactionModel> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  override id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  reaction: Reaction

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id: number

  @ForeignKey(() => CommentModel)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  comment_id: number
}
