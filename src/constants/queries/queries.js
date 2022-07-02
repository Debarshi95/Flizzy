import { gql } from '@apollo/client'

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!, $role: String) {
    loginUser(email: $email, password: $password, role: $role) {
      id
      token
      email
      name
      phoneNumber
      address
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
      address
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
      address
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
      address
      role
      availableLeaves
      active
    }
  }
`

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser {
      message
      success
    }
  }
`

const CREATE_LEAVE_RECORD = gql`
  mutation createLeaveRecord($startDate: String!, $endDate: String!, $reason: String) {
    createLeaveRecord(startDate: $startDate, endDate: $endDate, reason: $reason) {
      message
      success
    }
  }
`
const FETCH_LEAVE_RECORDS = gql`
  query getLeaveRecords($employeeId: String) {
    leaveRecords: getLeaveRecords(employeeId: $employeeId) {
      reason
      startDate
      endDate
      leaveStatus
    }
  }
`

const APPROVE_LEAVE_RECORD = gql`
  mutation approveLeaveRecord($employeeId: String!, $status: String!) {
    updateLeaveRecord(employeeId: $employeeId, status: $status) {
      message
      success
    }
  }
`
export {
  LOGIN_USER,
  FETCH_USER_DATA,
  FETCH_EMPLOYEE_LIST,
  CREATE_LEAVE_RECORD,
  REGISTER_EMPLOYEE_MUTATION,
  LOGOUT_USER,
  FETCH_LEAVE_RECORDS,
  APPROVE_LEAVE_RECORD,
}
