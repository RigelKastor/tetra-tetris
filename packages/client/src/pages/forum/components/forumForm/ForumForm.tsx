import { Form, Input } from 'antd'
import classes from './styles.module.less'
import { useTopic } from '@/providers/TopicContext'
import { useCallback } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { postNewTopic } from '@/api/forumApi'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const ForumForm: React.FC = () => {
  const { topicId, setTopicId } = useTopic()
  const [postForm] = useForm()
  const { user } = useTypedSelector(state => state.User)
  const newPost = useCallback(() => {
    if (!topicId) {
      const body = postForm.getFieldValue('comment')
      const theme = postForm.getFieldValue('theme')
      if (!user) {
        return
      }
      postNewTopic(theme, body, user.id)
        .then(response => {
          if (setTopicId) {
            setTopicId(response.data.id)
          }
        })
        .catch(reason => console.log(reason))
    }
  }, [])
  return (
    <div className={classes.forum__form}>
      {!topicId && (
        <span className={classes.forum__formTitle}>Create New Forum </span>
      )}
      <Form form={postForm} onFinish={newPost}>
        {!topicId && (
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={
              <span className={classes.forum__formItemTitle}>Forum name</span>
            }>
            <Form.Item name="theme" noStyle>
              <Input placeholder="Forum name" />
            </Form.Item>

            <span className={classes.forum__formSubText}>
              Maximum length 80 symblols
            </span>
          </Form.Item>
        )}

        <Form.Item
          labelCol={{ span: 24 }}
          colon={false}
          label={<span className={classes.forum__formItemTitle}>Comment</span>}>
          <Form.Item name="comment" noStyle>
            <Input.TextArea placeholder="Comment" />
          </Form.Item>
          <span className={classes.forum__formSubText}>
            Maximum length 300 symblols
          </span>
        </Form.Item>
        <button className={classes.forum__formBtn} type="submit">
          {!topicId ? 'Post new topic' : 'Post new comment'}
        </button>
      </Form>
    </div>
  )
}

export default ForumForm
