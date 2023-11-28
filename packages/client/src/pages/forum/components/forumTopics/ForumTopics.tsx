import Avatar from '@/components/Avatar/Avatar'
import someAva from '../../../../../public/avatar1.jpg'
import classes from './styles.module.less'
import { useTopic } from '@/providers/TopicContext'
import { useEffect, useState } from 'react'
import { CommentType } from '@/components/types'
import { getAllComments } from '@/api/forumApi'

const ForumTopics: React.FC = () => {
  const { topicId } = useTopic()
  const [comments, setComments] = useState<CommentType[]>()
  useEffect(() => {
    if (!topicId) return
    getAllComments(topicId).then(x => setComments(x.data))
  })
  return (
    <div className={classes.topics}>
      <div>
        <div className={classes.topics__wrapperImg}>
          <img className={classes.topics__img} src={someAva} />
        </div>

        <div className={classes.topics__wrapperText}>
          <span className={classes.topics__text}>{item.body}</span>
        </div>
      </div>
      <ul className={classes.topics__list}>
        {comments?.map(item => {
          return (
            <li className={classes.topics__item} key={item.id}>
              <div className={classes.topics__wrapperImg}>
                <img className={classes.topics__img} src={someAva} />
              </div>

              <div className={classes.topics__wrapperText}>
                <span className={classes.topics__text}>{item.body}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ForumTopics
