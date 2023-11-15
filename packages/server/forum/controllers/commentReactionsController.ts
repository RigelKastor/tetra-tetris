import type { Request, Response, Router } from 'express'
import { CommentReaction, Reaction } from '../models/reactions'

const getCommentReactions = async (request: Request, response: Response) => {
  const { comment_id } = request.params //query?
  if (isNaN(+comment_id)) {
    response.status(400).send('Invalid comment_d')
    return
  }
  CommentReaction.findAll({
    attributes: ['reaction', 'user_id'],
    where: {
      comment_id: comment_id,
    },
  }).then(topicReactions => {
    response.status(200).send(topicReactions)
  })
}

type ReactionModel = {
  reaction: Reaction
  user_id: number
}
const putCommentReaction = async (request: Request, response: Response) => {
  const { comment_id } = request.params
  if (isNaN(+comment_id)) {
    response.status(400).send('Invalid comment_d')
    return
  }
  const model = { ...request.body } as ReactionModel

  const existing = await CommentReaction.findOne({
    where: {
      user_id: model.user_id,
      comment_id: comment_id,
    },
  })
  if (existing) {
    response.status(409).send('This user already has a rection on this topic')
  } else {
    CommentReaction.create({
      comment_id: +comment_id,
      ...model,
    } as CommentReaction)
      .then(() => response.status(201).send())
      .catch(() => response.status(400).send('Bad request'))
  }
}

const deleteUserReactionOnComment = async (
  request: Request,
  response: Response
) => {
  const { comment_id } = request.params
  if (isNaN(+comment_id)) {
    response.status(400).send('Invalid comment_id')
    return
  }
  const { user_id } = request.body

  CommentReaction.destroy({
    where: {
      user_id: user_id,
      comment_id: comment_id,
    },
  })
    .then(destroyed => {
      if (destroyed === 1) {
        response.status(204).send()
      }
    })
    .catch(() => response.status(400).send('Bad Request'))
}

export function commentReactionsRouter(router: Router) {
  router.get('/topic/:topic_id/comments/:comment_id/reactions', (req, res) =>
    getCommentReactions(req, res)
  )
  router.put(
    '/topic/:topic_id/comments/:comment_id/reactions/put',
    (req, res) => putCommentReaction(req, res)
  )
  router.delete(
    '/topic/:topic_id/comments/:comment_id/reactions/delete',
    (req, res) => deleteUserReactionOnComment(req, res)
  )
}
