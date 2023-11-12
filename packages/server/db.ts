import { Topic } from './models/topic'
import { User } from './models/user'
import { Comment } from './models/comment'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { TopicReaction } from './models/reactions'
import { CommentReaction } from './models/reactions'

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    console.log('env', process.env)
    const {
      POSTGRES_USER,
      POSTGRES_PASSWORD,
      POSTGRES_DB,
      POSTGRES_PORT,
      POSTGRES_HOST,
    } = process.env

    const sequelizeOptions: SequelizeOptions = {
      username: POSTGRES_USER,
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
      dialect: 'postgres',
    }
    const sequelize = new Sequelize(sequelizeOptions)

    const res = await sequelize.query('SELECT NOW()')
    console.log('  ➜ 🎸 Connected to the database at:', res)
    sequelize.addModels([User, Topic, Comment, TopicReaction, CommentReaction])
    await sequelize.sync()
    return sequelize
  } catch (e) {
    console.error(e)
  }

  return null
}
