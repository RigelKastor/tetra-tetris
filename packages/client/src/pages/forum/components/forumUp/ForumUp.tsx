import Table from 'rc-table'
import classes from './styles.module.less'
import { RowProps } from 'antd'
import ForumTopics from '../forumTopics/ForumTopics'
import { useTopic } from '@/providers/TopicContext'
import { getAllTopics } from '@/api/forumApi'
import { TopicType } from '@/components/types'
import { useState, useEffect } from 'react'

const ForumUp: React.FC = () => {
  const { topicId, setTopicId } = useTopic()
  const [topics, setTopics] = useState<TopicType[]>()
  useEffect(() => {
    getAllTopics().then(t => setTopics(t.data))
  }, [])
  if (topicId) {
    return <ForumTopics />
  }

  return (
    <Table
      className={classes.forum__table}
      rowClassName={classes.forum__tableRow}
      rowKey="id"
      components={{
        header: {
          row: (props: RowProps) => (
            <tr {...props} className={classes.forum__tableHead} />
          ),
          cell: (props: any) => (
            <td {...props} className={classes.forum__tableHeaderCell} />
          ),
        },
        body: {
          cell: (props: any) => (
            <td {...props} className={classes.forum__tableBodyCell} />
          ),
        },
      }}
      onRow={record => ({
        onClick: () => {
          if (setTopicId) {
            setTopicId(record.id as number)
          }
        },
      })}
      columns={[
        {
          title: 'Theme',
          dataIndex: 'theme',
          key: 'theme',
        },
        {
          title: 'Body',
          dataIndex: 'body',
          key: 'body',
        },
      ]}
      data={topics}
    />
  )
}

export default ForumUp
