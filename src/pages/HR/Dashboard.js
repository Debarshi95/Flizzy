import { useCallback, useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { toast } from 'react-hot-toast'
import { Button, Row, Header, Modal, Text, EmployeeForm } from 'components'
import { FETCH_EMPLOYEE_LIST, LOGOUT_USER } from 'constants/queries/queries'
import { useAuthContext } from 'providers'
import { deleteLocalStorageData, formatErrorMsg } from 'utils/helperFuncs'
import withProtectedRoute from 'hoc/withProtectedRoute'

const LOGOUT_USER_MUTATION_OPTIONS = {
  onCompleted: (data) => {
    const { success = false } = data?.logoutUser || {}
    if (success) {
      deleteLocalStorageData('token')
    }
  },
}

const CREATE_EMPLOYEE_MODAL = 'CREATE_EMPLOYEE_MODAL'
const EMPLOYEE_DETAILS_MODAL = 'EMPLOYEE_DETAILS_MODAL'

const Dashboard = () => {
  const [modal, setModal] = useState({})

  const { user, setUser } = useAuthContext()

  const [fetchEmployeeList, { data, loading, refetch: refetchUsers }] =
    useLazyQuery(FETCH_EMPLOYEE_LIST)

  const [logoutUser] = useMutation(LOGOUT_USER, LOGOUT_USER_MUTATION_OPTIONS)

  useEffect(() => {
    if (!loading) {
      fetchEmployeeList()
    }
  }, [fetchEmployeeList, loading])

  const handleLogout = async () => {
    try {
      const res = await logoutUser()
      const { success = false } = res.data?.logoutUser || {}
      if (success) {
        setUser(null)
      }
    } catch (error) {
      const message = formatErrorMsg(error)
      toast.error(message)
    }
  }

  const handleModalToggle = useCallback((modalType) => {
    setModal((prev) => {
      const duplicate = { ...prev }
      if (duplicate[modalType]) {
        delete duplicate[modalType]
        return { ...duplicate }
      }
      const modalObj = {}
      modalObj[modalType] = true
      return { ...modalObj }
    })
  }, [])

  return (
    <div className="text-white">
      <Header user={user} onBtnClick={handleLogout} />
      <header className="flex justify-between my-2">
        <Text variant="h2" className="text-2xl font-semibold">
          All Employees
        </Text>
        <Button
          className="w-48 rounded-lg bg-blue-600 py-2"
          onClick={() => handleModalToggle(CREATE_EMPLOYEE_MODAL)}
        >
          Add new Employee
        </Button>
      </header>
      <section className="my-4">
        {data?.employees?.map((emp) => (
          <Row
            key={emp.id}
            employee={emp}
            onClick={() => handleModalToggle(EMPLOYEE_DETAILS_MODAL)}
          />
        ))}
      </section>
      <Modal
        isOpen={modal[EMPLOYEE_DETAILS_MODAL] || modal[CREATE_EMPLOYEE_MODAL]}
        onClose={() => handleModalToggle()}
      >
        {modal[CREATE_EMPLOYEE_MODAL] && (
          <EmployeeForm
            onSubmit={() => handleModalToggle(CREATE_EMPLOYEE_MODAL)}
            onSuccess={refetchUsers}
          />
        )}

        {modal[EMPLOYEE_DETAILS_MODAL] && <h1>HEllo</h1>}
      </Modal>
    </div>
  )
}

export default withProtectedRoute(Dashboard)
