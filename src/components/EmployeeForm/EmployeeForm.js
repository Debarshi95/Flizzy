import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { Form, Formik } from 'formik'
import { Text, Input, Button } from 'components'
import { REGISTER_EMPLOYEE_MUTATION } from 'constants/queries/queries'
import { validateUser } from 'utils/formValidators'
import { formatErrorMsg } from 'utils/helperFuncs'

const EmployeeForm = ({ onSubmit, onSuccess }) => {
  const [createEmployee] = useMutation(REGISTER_EMPLOYEE_MUTATION)

  const handleSubmit = async (values) => {
    try {
      const res = await createEmployee({
        variables: {
          ...values,
        },
      })
      const { id = '' } = res.data?.registerEmployee || {}
      onSubmit(false)
      if (id) {
        onSuccess()
      }
    } catch (error) {
      const message = formatErrorMsg(error)
      toast.error(message)
    }
  }

  return (
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
                <Text variant="p" className="bg-red-600 text-white p-2 mb-4 rounded-md text-center">
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
  )
}

EmployeeForm.defaultProps = {
  onSubmit: () => null,
  onSuccess: () => null,
}

export default EmployeeForm
