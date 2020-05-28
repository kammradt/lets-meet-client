import {http} from '../../../plugins/axios'
import {handleError} from "../../../plugins/notification";

const USERS = '/users'

const register = async ({email, password}) => {
  try {
    const response = await http.post(USERS, {
      email, password
    })
    return response.data
  } catch (err) {
    handleError(err)
  }
}

export {
  register
}
