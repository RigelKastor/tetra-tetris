import type { Request, Response } from 'express'
import CommentModel from '../models/commentModel'
import { Sequelize } from 'sequelize-typescript'

const getComments = (req: Request, res: Response) => {
  const { parent_id } = req.params

  CommentModel.findAll({
    where: {
      parent_id,
    },
    order: [[Sequelize.col('createdAt'), 'ASC']],
  })
    .then(comments => {
      res.status(200).json(comments)
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' })
    })
}

const postComment = (req: Request, res: Response) => {
  const { parent_id } = req.params

  CommentModel.create({
    ...req.body,
    parent_id,
  })
    .then(comment => {
      CommentModel.findOne({
        where: {
          id: comment.id,
        },
      })
        .then(comment => {
          res.status(200).json(comment)
        })
        .catch(() => {
          res.status(400).json({ message: 'Bad request' })
        })
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' })
    })
}

const deleteComment = (req: Request, res: Response) => {
  const { id } = req.params

  CommentModel.findOne({ where: { id } }).then(() => {
    CommentModel.destroy({
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
}

const updateComment = (req: Request, res: Response) => {
  const { id } = req.params

  CommentModel.findOne({ where: { id } }).then(() => {
    CommentModel.update(
      {
        ...req.body,
      },
      {
        where: { id },
      }
    )
      .then(() => {
        CommentModel.findOne({
          where: {
            id,
          },
        })
          .then(comment => {
            res.status(200).json(comment)
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

export { getComments, postComment, updateComment, deleteComment }
