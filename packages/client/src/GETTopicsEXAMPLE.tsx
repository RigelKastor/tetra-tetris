import { useEffect, useState } from 'react'
import defaultApi, { baseUrl } from './api/api'
// подключен в main.tsx. Удалить
const GETTopicsEXAMPLE: React.FC = () => {
  // тут редакс надо настравивать для всего такого
  const [topics, setTopics] = useState([])
  useEffect(() => {
    const getTopics = async () => {
      try {
        const response = await defaultApi(`${baseUrl}/topics`)
        if (response.statusText === 'OK') {
          console.log(`response`, response.data)
          setTopics(response.data)
        }
      } catch (error) {
        console.log(`error`, error)
      }
    }
    getTopics()
  }, [])
  return (
    <div>
      {topics.map(
        (topic: { theme: string; id: number; body: string; uid: number }) => {
          return (
            <div key={topic.id}>
              <div style={{ color: 'white' }}>{topic.theme}</div>
              <div style={{ color: 'white' }}>{topic.body}</div>
            </div>
          )
        }
      )}
    </div>
  )
}

export default GETTopicsEXAMPLE
