import { gql } from '@apollo/client'

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!, $role: String) {
    loginUser(email: $email, password: $password, role: $role) {
      id
      token
      email
      name
      phoneNumber
      role
      salary
      designation
    }
  }
`

const FETCH_USER_DATA = gql`
  query fetchUserData($token: String!) {
    user: getUser(token: $token) {
      id
      token
      email
      name
      phoneNumber
      role
      salary
      designation
    }
  }
`

export { LOGIN_USER, FETCH_USER_DATA }
