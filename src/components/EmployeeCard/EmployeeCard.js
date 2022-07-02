import toast from 'react-hot-toast'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { Text, RecordCard } from 'components'
import { APPROVE_LEAVE_RECORD, FETCH_LEAVE_RECORDS } from 'constants/queries/queries'
import { formatErrorMsg } from 'utils/helperFuncs'

const EmployeeCard = ({ employee, onSuccess }) => {
  const [fetchLeaveRecords, { data, loading }] = useLazyQuery(FETCH_LEAVE_RECORDS, {
    variables: { employeeId: employee.id },
    fetchPolicy: 'network-only',
  })

  const [approveLeave] = useMutation(APPROVE_LEAVE_RECORD)

  useEffect(() => {
    if (!loading) {
      fetchLeaveRecords()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchLeaveRecords])

  const handleApproveLeave = async (status = 'PENDING') => {
    try {
      const res = await approveLeave({
        variables: {
          employeeId: employee.id,
          status,
        },
      })
      const { success = false, message = '' } = res.data?.updateLeaveRecord || {}
      if (success) {
        toast.success(message)
        onSuccess()
      }
    } catch (error) {
      const message = formatErrorMsg(error)
      toast.error(message)
    }
  }
  return (
    <div>
      <div>
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
              <RecordCard
                key={idx}
                record={record}
                className="md:w-full mb-2 bg-slate-700"
                onBtnClick={handleApproveLeave}
                userRole="HR"
              />
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
