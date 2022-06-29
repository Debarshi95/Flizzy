import { Form, Formik } from 'formik'

import { Link, useNavigate } from 'react-router-dom'

import { Button, Text, Input } from 'components'
import { validateLogin } from 'utils/formValidators'

const GUEST_EMAIL = process.env.REACT_APP_GUEST_EMAIL
const GUEST_PASSWORD = process.env.REACT_APP_GUEST_PASSWORD

const Home = () => {
  const navigate = useNavigate()

  const handleSubmit = async (values, { resetForm }) => {
    let message

    try {
      const res = ''
      if (res?.id) {
        navigate('/', { replace: true })
      }
    } catch (err) {
      //
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
    <div className="flex p-4 flex-col md:flex-row md:justify-evenly items-center h-screen w-full">
      <header className="h-fit  md:mb-10">
        <Text className="text-gray-50 text-4xl md:text-6xl font-semibold" variant="h1">
          Flizzy
        </Text>
        <Text className="text-gray-200 text-2xl">An employee management system</Text>
      </header>
      <section className="w-full border-gray-600 border max-w-md mt-10 md:mt-0  p-4 rounded-md">
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
            console.log({ values, touched })
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
                    {isSubmitting ? 'Submitting...' : 'Signin with guest employee account'}
                  </Button>
                  <Text className="text-gray-300 text-center my-2">
                    HR?{' '}
                    <Link
                      to="/signup"
                      className="text-white font-medium hover:border-b-2 border-white"
                    >
                      Sign in as HR
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

export default Home
