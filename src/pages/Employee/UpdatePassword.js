import { Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Button, Text, Input } from 'components'
import { validateLogin } from 'utils/formValidators'
import { LOGIN_USER } from 'constants/queries/queries'
import { formatErrorMsg, setLocalStorageData } from 'utils/helperFuncs'
import { useAuthContext } from 'providers'

const GUEST_EMAIL = process.env.REACT_APP_GUEST_EMAIL
const GUEST_PASSWORD = process.env.REACT_APP_GUEST_PASSWORD

const LOGIN_USER_MUTATION_OPTIONS = {
  onCompleted: (data) => {
    const { loginUser } = data || {}
    if (loginUser?.token) {
      setLocalStorageData('token', loginUser.token, true)
    }
  },
}

const Signin = () => {
  const navigate = useNavigate()

  const { setUser } = useAuthContext()
  const [loginUser] = useMutation(LOGIN_USER, LOGIN_USER_MUTATION_OPTIONS)

  const handleSubmit = async (values, { resetForm }) => {
    let message
    const { email, password } = values

    try {
      const res = await loginUser({
        variables: {
          email,
          password,
          role: 'HR',
        },
      })
      if (res?.data?.loginUser) {
        setUser(res.data.loginUser)
        navigate('/hr/dashboard', { replace: true })
      }
    } catch (err) {
      message = formatErrorMsg(err)
    }

    resetForm({
      values: { ...values, password: '' },
      errors: { message },
      touched: {
        password: true,
      },
    })
    return null
  }

  return (
    <div className="flex p-4 flex-col md:justify-evenly items-center w-full min-h-screen">
      <Text className="h-fit text-gray-50 text-3xl font-medium" variant="h2">
        Sign In as HR
      </Text>
      <section className="w-full border-gray-600 border max-w-md mt-10 md:mt-0 p-4 rounded-md">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validateLogin()}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit: handleFormikSubmit,
            isSubmitting,
            values,
            errors,
            touched,
            setValues,
          }) => {
            return (
              <>
                <Text
                  variant="h5"
                  className="text-2xl my-4 text-center text-blue-500 font-medium mb-6"
                >
                  Sign in to continue
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
                    className="mt-4 p-2 text-gray-300 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold"
                    disabled={
                      isSubmitting ||
                      Boolean(!touched || values.email === '' || values.password === '')
                    }
                  >
                    {isSubmitting ? 'Submitting...' : 'Signin'}
                  </Button>
                  <Button
                    component="button"
                    type="button"
                    className="my-4 p-2 text-blue-500 font-semibold bg-transparent rounded-md border-2 border-blue-500"
                    disabled={isSubmitting}
                    onClick={() => {
                      setValues({
                        email: GUEST_EMAIL,
                        password: GUEST_PASSWORD,
                      })
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Signin with guest HR account'}
                  </Button>
                  <Text className="text-gray-300 text-center my-2">
                    Not HR?{' '}
                    <Link to="/" className="text-white font-medium hover:border-b-2 border-white">
                      Sign in as Employee
                    </Link>
                  </Text>
                </Form>
              </>
            )
          }}
        </Formik>
      </section>
    </div>
  )
}

export default Signin
