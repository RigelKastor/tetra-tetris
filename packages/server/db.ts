import UserModel from './forum/models/userModel'
import TopicModel from './forum/models/topicModel'
import CommentModel from './forum/models/commentModel'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import TopicReactionModel from './forum/models/reactions'
import CommentReactionModel from './forum/models/reactions'

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
      process.env

    const sequelizeOptions: SequelizeOptions = {
      username: POSTGRES_USER,
      host: 'localhost', // Вот тут понять как менять на 'localhost' если запускаем через yarn dev,
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
    await sequelize.sync()

    // ############### код нижу будет удалён

    //удаляю ранее созданных юзеров и обнуляю id для тестовых топиков
    await UserModel.destroy({ where: {} })
    await UserModel.sequelize!.query(
      'ALTER SEQUENCE users_id_seq RESTART WITH 1'
    )

    // добавляю тестовых юзеров
    sequelize.query(
      "INSERT INTO users (login, name, avatar, theme) VALUES ('kochanov@yandex.ru', 'Andrey', 'avaLink', 'light'), ('semen@yandex.ru', 'Semen', 'avaLink', 'dark')"
    )

    // добавляю тестовые топики

    sequelize.query(
      "INSERT INTO topics (theme, body, uid) VALUES ('Как набрать 1000 очков', 'Есть ли какой-то лайфхак?', 1), ('Игровой гайд', 'LOREM IPSUM BLA BLA BLA', 2);"
    )
    // ###########################################
    return sequelize
  } catch (e) {
    console.error(e)
  }

  return null
}
// 'postgres://postgres:postgres@postgres:127.0.0.1:5432/postgres',
