import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Topic } from './topic'
import { CommentReaction } from './reactions'

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'comments',
})
export class Comment extends Model<Comment> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  comment_id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  topic_author!: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  topic_author_id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  body!: string

  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER, field: 'topic_id' })
  topic!: Topic

  @ForeignKey(() => Comment)
  @AllowNull(true)
  @Column({ type: DataType.INTEGER, field: 'parent_id' })
  parent_comment: Comment | undefined

  @HasMany(() => Comment, 'parent_id')
  comments: Comment[] | undefined

  @HasMany(() => CommentReaction, 'comment_id')
  reactions: CommentReaction[] | undefined
}
