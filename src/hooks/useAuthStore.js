import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store"

export const useAuthStore = () => {

  const dispatch = useDispatch()
  const { status, user, errorMessage } = useSelector(state => state.auth)

  const startLogin = async ({ email, password }) => {

    dispatch(onChecking())

    try {

      const { data } = await calendarApi.post('/auth', { email, password })
      const { token, uid, name } = data
      localStorage.setItem('token', token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ uid, name }))

    } catch (error) {
      dispatch(onLogout('invalid credentials'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10);
    }
  }

  const startRegister = async ({ email, password, name }) => {

    dispatch(onChecking())

    try {

      const { data } = await calendarApi.post('/auth/new', { email, password, name })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      console.log({ uid: data.uid, name: data.name });
      dispatch(onLogin({ uid: data.uid, name: data.name }))

    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || '--'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10);
    }
  }


  return {
    //* Properties
    errorMessage,
    status,
    user,

    //* Methods
    startLogin,
    startRegister
  }
}
