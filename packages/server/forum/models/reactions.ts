import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Topic } from './topic'
import { Comment } from './comment'

export type Reaction = 'like' | 'dislike'

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'topic_reactions',
})
export class TopicReaction extends Model<TopicReaction> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  reaction_id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  reaction!: Reaction

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number

  @ForeignKey(() => Topic)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'topic_id' })
  topic!: Topic
}

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'comment_reactions',
})
export class CommentReaction extends Model<CommentReaction> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  reaction_id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  reaction!: Reaction

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number

  @ForeignKey(() => Comment)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'comment_id' })
  comment!: Comment
}
