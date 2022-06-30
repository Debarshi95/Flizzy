import { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useToaster } from 'react-hot-toast'
import { Form, Formik } from 'formik'
import { Button, Card, Header, Input, Modal, Text } from 'components'
import {
  REGISTER_EMPLOYEE_MUTATION,
  FETCH_EMPLOYEE_LIST,
  LOGOUT_USER,
} from 'constants/queries/queries'
import { useAuthContext } from 'providers'
import { validateUser } from 'utils/formValidators'
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

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { user, setUser } = useAuthContext()

  const toast = useToaster()
  const [fetchEmployeeList, { data, loading, refetch: refetchUsers }] =
    useLazyQuery(FETCH_EMPLOYEE_LIST)

  const [createEmployee] = useMutation(REGISTER_EMPLOYEE_MUTATION)

  const [logoutUser] = useMutation(LOGOUT_USER, LOGOUT_USER_MUTATION_OPTIONS)

  useEffect(() => {
    if (!loading) {
      fetchEmployeeList()
    }
  }, [fetchEmployeeList, loading])

  const handleSubmit = async (values) => {
    try {
      const res = await createEmployee({
        variables: {
          ...values,
        },
      })
      const { id = '' } = res.data?.registerEmployee || {}
      setIsModalOpen(false)
      if (id) {
        refetchUsers()
      }
    } catch (error) {
      const message = formatErrorMsg(error)
      toast.error(message)
    }
  }

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
  return (
    <div className="text-white">
      <Header user={user} onBtnClick={handleLogout} />
      <header className="flex justify-between my-2">
        <Text variant="h2" className="text-2xl font-semibold">
          All Employees
        </Text>
        <Button className="w-48 rounded-lg bg-blue-600 py-2" onClick={() => setIsModalOpen(true)}>
          Add new Employee
        </Button>
      </header>
      <section className="my-4">
        {data?.employees?.map((emp) => (
          <Card key={emp.id} employee={emp} />
        ))}
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <section>
          <Formik
            initialValues={{
              name: '',
              email: '',
              phoneNumber: '',
              address: '',
              salary: '',
              designation: '',
            }}
            validationSchema={validateUser()}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit: handleFormikSubmit, isSubmitting, values, errors }) => {
              return (
                <>
                  <Text
                    variant="h5"
                    className="text-2xl my-4 text-center text-blue-500 font-medium mb-6"
                  >
                    Create an Employee
                  </Text>
                  {errors?.message && (
                    <Text
                      variant="p"
                      className="bg-red-600 text-white p-2 mb-4 rounded-md text-center"
                    >
                      {errors.message || 'Oops! Some error occurred'}
                    </Text>
                  )}
                  <Form autoComplete="off" onSubmit={handleFormikSubmit}>
                    <Input
                      name="name"
                      hasLabel
                      label="Fullname"
                      type="text"
                      placeholder="JohnDoe"
                      value={values.name}
                    />
                    <Input
                      name="email"
                      hasLabel
                      label="Email"
                      type="email"
                      placeholder="johndoe@test.com"
                      value={values.email}
                    />
                    <Input
                      name="phoneNumber"
                      hasLabel
                      label="Contact Number"
                      type="text"
                      placeholder="12345678"
                      value={values.phoneNumber}
                    />
                    <Input
                      name="address"
                      hasLabel
                      label="Address"
                      type="text"
                      placeholder="Ransiam, CA"
                      value={values.address}
                    />
                    <Input
                      name="designation"
                      hasLabel
                      label="Designation"
                      type="text"
                      placeholder="Software Developer"
                      value={values.designation}
                    />
                    <Input
                      name="salary"
                      hasLabel
                      label="Salaray(in LPA)"
                      type="text"
                      placeholder="10"
                      value={values.salary}
                    />
                    <Button
                      component="button"
                      type="submit"
                      className="mt-4 p-2 text-gray-300 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Create'}
                    </Button>
                  </Form>
                </>
              )
            }}
          </Formik>
        </section>
      </Modal>
    </div>
  )
}

export default withProtectedRoute(Dashboard)
