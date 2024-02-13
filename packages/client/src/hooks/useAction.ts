import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../store/index'

// хук помогает на изи юзать экшены из стора

const useAction = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actionCreators, dispatch)
}

export default useAction
