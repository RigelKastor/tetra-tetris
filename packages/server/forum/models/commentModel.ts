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
import TopicModel from './topicModel'

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'comments',
})
export default class CommentModel extends Model<CommentModel> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public override id: number

  @Column(DataType.INTEGER)
  user_id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  body: string

  @ForeignKey(() => TopicModel)
  @Column(DataType.INTEGER)
  topic_id: number

  @ForeignKey(() => CommentModel)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  parent_id: number | undefined

  @HasMany(() => CommentModel, 'parent_id')
  comments: Comment[] | undefined
}
