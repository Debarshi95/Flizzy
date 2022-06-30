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
      availableLeaves
      active
    }
  }
`

const FETCH_USER_DATA = gql`
  query fetchUserData {
    user: getUser {
      id
      token
      email
      name
      phoneNumber
      role
      salary
      designation
      availableLeaves
      active
    }
  }
`
const FETCH_EMPLOYEE_LIST = gql`
  query fetchEmployeeList {
    employees: getAllUsers {
      id
      name
      email
      phoneNumber
      salary
      designation
      role
      availableLeaves
      active
    }
  }
`

const REGISTER_EMPLOYEE_MUTATION = gql`
  mutation registerEmployee(
    $name: String!
    $email: String!
    $phoneNumber: String!
    $salary: String!
    $designation: String!
    $address: String!
  ) {
    registerEmployee(
      name: $name
      email: $email
      phoneNumber: $phoneNumber
      salary: $salary
      designation: $designation
      address: $address
    ) {
      id
      name
      email
      phoneNumber
      salary
      designation
      role
      availableLeaves
      active
    }
  }
`
export { LOGIN_USER, FETCH_USER_DATA, FETCH_EMPLOYEE_LIST, REGISTER_EMPLOYEE_MUTATION }
