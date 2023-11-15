import type { Request, Response, Router } from 'express'
import TopicModel from '../models/topicModel'
import { Sequelize } from 'sequelize-typescript'
import CommentModel from '../models/commentModel'

const getTopics = (res: Response) => {
  TopicModel.findAll({
    order: [[Sequelize.col('createdAt'), 'DESC']],
  })
    .then(topics => {
      res.status(200).json(topics)
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' })
    })
}

const getTopic = (req: Request, res: Response) => {
  const { id } = req.params
  TopicModel.findAll({
    where: {
      id,
    },
    include: {
      model: CommentModel,
    },
    order: [[Sequelize.col('createdAt'), 'DESC']],
  })
    .then(topics => {
      res.status(200).json(topics)
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' })
    })
}

const postTopic = (req: Request, res: Response) => {
  const {
    user: { id },
  } = res.locals

  TopicModel.create({
    ...req.body,
    uid: id,
  })
    .then(topic => {
      TopicModel.findOne({
        where: {
          id: topic.id,
        },
      })
        .then(topic => {
          res.status(200).json(topic)
        })
        .catch(() => {
          res.status(400).json({ message: 'Bad request' })
        })
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' })
    })
}

const deleteTopic = (req: Request, res: Response) => {
  const { id } = req.params

  TopicModel.findOne({ where: { id } })
    .then(() => {
      TopicModel.destroy({
        where: { id },
      })
        .then(deletedRecord => {
          deletedRecord === 1
            ? res.status(200).json({ message: 'OK' })
            : res.status(404).json({ message: 'Not found' })
        })
        .catch(() => {
          res.status(400).json({ message: 'Bad request' })
        })
    })
    .catch(() => {
      res.status(400).json({ message: 'not found' })
    })
}

const updateTopic = (req: Request, res: Response) => {
  const { id } = req.params

  TopicModel.findOne({ where: { id } }).then(() => {
    TopicModel.update(
      {
        ...req.body,
      },
      { where: { id } }
    )
      .then(() => {
        TopicModel.findOne({
          where: {
            id,
          },
        })
          .then(topic => {
            res.status(200).json(topic)
          })
          .catch(() => {
            res.status(400).json({ message: 'Bad request' })
          })
      })
      .catch(() => {
        res.status(400).json({ message: 'Bad request' })
      })
  })
}

export function topicRouter(router: Router) {
  router.get('/topics/:topic_id', (req, res) => getTopic(req, res))
  router.get('/topics', (_req, res) => getTopics(res))
  router.put('/topics/:topic_id', (req, res) => updateTopic(req, res))
  router.post('/topics', (req, res) => postTopic(req, res))
  router.delete('/topic/:topic_id', (req, res) => deleteTopic(req, res))
}
