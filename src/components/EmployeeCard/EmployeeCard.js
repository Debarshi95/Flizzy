import { useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { Text, RecordCard } from 'components'
import { FETCH_LEAVE_RECORDS } from 'constants/queries/queries'

const EmployeeCard = ({ employee }) => {
  const [fetchLeaveRecords, { data, loading }] = useLazyQuery(FETCH_LEAVE_RECORDS, {
    variables: { employeeId: employee.id },
  })

  useEffect(() => {
    if (!loading) {
      fetchLeaveRecords()
    }
  }, [fetchLeaveRecords, loading])
  return (
    <div>
      <div className="border-slate-200 border-2 rounded-sm">
        <Text
          variant="h1"
          className="text-3xl text-gray-50 font-semibold border-gray-50 border-b p-2 text-center"
        >
          {employee.name}
        </Text>
        <section className="my-2 text-start text-base text-gray-200 font-normal py-2 px-4">
          <Text>Email: {employee.email}</Text>
          <Text>Contact: {employee.phoneNumber}</Text>
          <Text>Address: {employee.address}</Text>
          <Text>Designation: {employee.designation}</Text>
          <Text>Salary: {employee.salary} LPA</Text>
          <Text>Available Leaves: {employee.availableLeaves}</Text>
        </section>
      </div>
      <div>
        <Text variant="h1" className="text-2xl my-2 font-medium text-white border-b border-white">
          Leave Details
        </Text>
        <div>
          {data?.leaveRecords?.length ? (
            data?.leaveRecords?.map((record, idx) => (
              <RecordCard key={idx} record={record} className="md:w-full mb-2 bg-slate-700" />
            ))
          ) : (
            <Text className="text-2xl text-center text-white my-6">No Record Found</Text>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard
