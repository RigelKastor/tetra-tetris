import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

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
}

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
}
