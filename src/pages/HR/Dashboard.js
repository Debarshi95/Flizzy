import { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Button, Card, Text } from 'components'
import { FETCH_EMPLOYEE_LIST } from 'constants/queries/queries'
import withProtectedRoute from 'hoc/withProtectedRoute'

const Dashboard = () => {
  const [fetchEmployeeList, { data, loading }] = useLazyQuery(FETCH_EMPLOYEE_LIST)

  useEffect(() => {
    if (!loading) {
      fetchEmployeeList()
    }
  }, [fetchEmployeeList, loading])

  return (
    <div className="text-white">
      <header className="flex justify-between my-2">
        <Text variant="h2" className="text-2xl font-semibold">
          All Employees
        </Text>
        <Button className="w-48 rounded-lg bg-blue-600 py-2">Add new Employee</Button>
      </header>
      <section className="my-4">
        {data?.employees?.map((emp) => (
          <Card key={emp._id} employee={emp} />
        ))}
      </section>
    </div>
  )
}

export default withProtectedRoute(Dashboard)
