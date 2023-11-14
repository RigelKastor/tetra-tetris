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
import UserModel from './userModel'

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

  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  uid: number

  @AllowNull(false)
  @Column(DataType.STRING)
  body: string

  @ForeignKey(() => TopicModel)
  @Column(DataType.INTEGER)
  topic_id: number

  @ForeignKey(() => CommentModel)
  @AllowNull(true)
  @Column(DataType.UUIDV4)
  parent_id: number | undefined

  @HasMany(() => CommentModel, 'parent_id')
  comments: Comment[] | undefined
}
