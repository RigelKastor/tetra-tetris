import someAva from '../../../../../public/avatar1.jpg'
import classes from './styles.module.less'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const ForumTopics: React.FC = () => {
  const { topic } = useTypedSelector(state => state.Topic)

  return (
    <div className={classes.topics}>
      <div>
        <div className={classes.topics__wrapperImg}>
          <img className={classes.topics__img} src={someAva} />
        </div>

        <div className={classes.topics__wrapperText}>
          <span className={classes.topics__text}>{topic?.body}</span>
        </div>
      </div>
      <ul className={classes.topics__list}>
        {topic?.comments?.map(item => {
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
