import UserModel from './forum/models/userModel'
import TopicModel from './forum/models/topicModel'
import CommentModel from './forum/models/commentModel'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import TopicReactionModel from './forum/models/reactions'
import CommentReactionModel from './forum/models/reactions'

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    const {
      POSTGRES_USER,
      POSTGRES_PASSWORD,
      POSTGRES_DB,
      POSTGRES_PORT,
      POSTGRES_HOST,
    } = process.env

    const sequelizeOptions: SequelizeOptions = {
      username: POSTGRES_USER,
      host: POSTGRES_HOST, // Вот тут понять как менять на 'localhost' если запускаем через yarn dev,
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
      dialect: 'postgres',
    }

    const sequelize = new Sequelize(sequelizeOptions)

    const res = await sequelize.query('SELECT NOW()')
    console.log('  ➜ 🎸 Connected to the database at:', res)

    sequelize.addModels([
      UserModel,
      TopicModel,
      CommentModel,
      TopicReactionModel,
      CommentReactionModel,
    ])
    await sequelize.sync({ force: true })
    return sequelize
  } catch (e) {
    console.error(e)
  }

  return null
}
// 'postgres://postgres:postgres@postgres:127.0.0.1:5432/postgres',
