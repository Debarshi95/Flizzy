import toast from 'react-hot-toast'
import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Button, Text, Input } from 'components'
import { validateLogin } from 'utils/formValidators'
import { UPDATE_PASSWORD } from 'constants/queries/queries'
import { formatErrorMsg } from 'utils/helperFuncs'

const UpdatePassword = () => {
  const navigate = useNavigate()

  const [updatePassword] = useMutation(UPDATE_PASSWORD)

  const handleSubmit = async (values, { resetForm }) => {
    let errorMessage
    const { email, password } = values

    try {
      const res = await updatePassword({
        variables: {
          email,
          password,
          role: 'EMP',
        },
      })
      const { success = false, message = '' } = res?.data?.updatePassword || {}
      if (success) {
        navigate('/', { replace: true })
        toast.success(message)
      }
    } catch (err) {
      errorMessage = formatErrorMsg(err)
    }

    resetForm({
      values: { ...values, password: '' },
      errors: { errorMessage },
      touched: {
        password: true,
      },
    })
    return null
  }

  return (
    <div className="flex p-4 flex-col md:justify-evenly items-center w-full min-h-screen">
      <section className="w-full border-gray-600 border max-w-md mt-10 md:mt-0 p-4 rounded-md">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validateLogin()}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit: handleFormikSubmit, isSubmitting, values, errors, touched }) => {
            return (
              <>
                <Text
                  variant="h5"
                  className="text-2xl my-4 text-center text-blue-500 font-medium mb-6"
                >
                  Update Password to continue
                </Text>
                {errors?.errorMessage && (
                  <Text
                    variant="p"
                    className="bg-red-600 text-white p-2 mb-4 rounded-md text-center"
                  >
                    {errors.errorMessage || 'Oops! Some error occurred'}
                  </Text>
                )}
                <Form autoComplete="off" onSubmit={handleFormikSubmit}>
                  <Input
                    name="email"
                    hasLabel
                    label="Email"
                    type="email"
                    placeholder="johndoe@test.com"
                    value={values.email}
                  />
                  <Input
                    name="password"
                    type="password"
                    hasLabel
                    label="Password"
                    placeholder="******"
                    value={values.password}
                  />
                  <Button
                    component="button"
                    type="submit"
                    className="mt-4  mb-10 p-2 text-gray-300 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold"
                    disabled={
                      isSubmitting ||
                      Boolean(!touched || values.email === '' || values.password === '')
                    }
                  >
                    {isSubmitting ? 'Submitting...' : 'Update Password'}
                  </Button>
                </Form>
              </>
            )
          }}
        </Formik>
      </section>
    </div>
  )
}

export default UpdatePassword
