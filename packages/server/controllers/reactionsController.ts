import type { Request, Response, Router } from 'express'
import { Reaction, TopicReaction } from '../models/reactions'

export function useReactionsApi(router: Router) {
  router.get('/topic/:topic_id/reactions', (req, res) =>
    getTopicReactions(req, res)
  )
  router.put('/topic/:topic_id/reactions/put', (req, res) =>
    putTopicReaction(req, res)
  )
  router.delete('/topic/:topic_id/reactions/delete', (req, res) =>
    deleteUserReactionOnTopic(req, res)
  )
}

const getTopicReactions = async (request: Request, response: Response) => {
  const { topic_id } = request.params //query?
  if (isNaN(+topic_id)) {
    response.status(404).send('Invalid topic_id')
    return
  }
  TopicReaction.findAll({
    attributes: ['reaction', 'user_id'],
    where: {
      topic_id: topic_id,
    },
  }).then(topicReactions => {
    response.status(200).send(topicReactions)
  })
}

type ReactionModel = {
  reaction: Reaction
  user_id: number
}
const putTopicReaction = async (request: Request, response: Response) => {
  const { topic_id } = request.params
  if (isNaN(+topic_id)) {
    response.status(400).send('Invalid topic_id')
    return
  }
  const model = { ...request.body } as ReactionModel

  const existing = await TopicReaction.findOne({
    where: {
      user_id: model.user_id,
      topic_id: topic_id,
    },
  })
  if (existing) {
    response.status(409).send('This user already has a rection on this topic')
  } else {
    TopicReaction.create({
      topic_id: +topic_id,
      ...model,
    } as TopicReaction)
      .then(() => response.status(201).send())
      .catch(() => response.status(400).send('Bad request'))
  }
}

const deleteUserReactionOnTopic = async (
  request: Request,
  response: Response
) => {
  const { topic_id } = request.params
  if (isNaN(+topic_id)) {
    response.status(404).send('Invalid topic_id')
    return
  }
  const { user_id } = request.body

  TopicReaction.destroy({
    where: {
      user_id: user_id,
      topic_id: topic_id,
    },
  })
    .then(destroyed => {
      if (destroyed === 1) {
        response.status(204).send()
      }
    })
    .catch(() => response.status(400).send('Bad Request'))
}
