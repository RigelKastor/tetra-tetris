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
  @AutoIncrement
  @Column(DataType.INTEGER)
  reaction_id: number

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
export class CommentReaction extends Model<CommentReaction> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  reaction_id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  reaction: Reaction

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id: number

  @ForeignKey(() => Comment)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  comment_id: number
}
