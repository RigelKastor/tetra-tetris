import { Button, Form, Modal, Upload, message } from 'antd'
import { FC, useCallback, useContext, useEffect, useState } from 'react'
import Avatar from '../Avatar/Avatar'
import { putUserAvatar } from '@/api/user'
import { useForm } from 'antd/lib/form/Form'
import UserContext from '@/providers/userProvider/UserContext'

type ChangeAvatarProps = {
  avatar: string
  isOpen: boolean
  onCancel?: () => void
  onOk: () => void
}

export const ChangeAvatar: FC<ChangeAvatarProps> = (
  props: ChangeAvatarProps
) => {
  const [avatarForm] = useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const { setUser } = useContext(UserContext)
  const [imageSource, setImageSource] = useState('')
  useEffect(() => {
    setImageSource(props.avatar)
  }, [])
  const [file, setFile] = useState<File>()
  const beforeUpload = useCallback((newFile: File) => {
    setFile(newFile)
    setImageSource(URL.createObjectURL(newFile))
    return false
  }, [])

  const uploadNewAvatar = useCallback(() => {
    if (file) {
      const request = new FormData()
      request.append('avatar', file)
      putUserAvatar(request)
        .then(x => {
          if (x && setUser) {
            setImageSource(x.avatar as string)
            setUser(x)
          }
        })
        .catch(error => messageApi.error(error.message))
    }
  }, [file])

  return (
    <Modal
      open={props.isOpen}
      onCancel={props.onCancel}
      onOk={async () => {
        await avatarForm.submit()
        props.onOk()
      }}>
      {contextHolder}
      <Form onFinish={uploadNewAvatar} form={avatarForm}>
        <Avatar size="md" img={imageSource} />
        <Form.Item>
          <Upload accept="image/*" beforeUpload={beforeUpload}>
            <Button>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
