import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { toast } from 'react-hot-toast'
import { Button, DatePicker, Header, RecordCard, Text } from 'components'
import { CREATE_LEAVE_RECORD, FETCH_LEAVE_RECORDS, LOGOUT_USER } from 'constants/queries/queries'
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

const Dashboard = () => {
  const [dates, setDates] = useState(null)
  const inputRef = useRef()

  const { user, setUser } = useAuthContext()

  const [fetchLeaveRecords, { data, loading, refetch: refetchRecords }] =
    useLazyQuery(FETCH_LEAVE_RECORDS)

  const [createLeaveRecord] = useMutation(CREATE_LEAVE_RECORD)
  const [logoutUser] = useMutation(LOGOUT_USER, LOGOUT_USER_MUTATION_OPTIONS)

  useEffect(() => {
    if (!loading) {
      fetchLeaveRecords()
    }
  }, [fetchLeaveRecords, loading])

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

  const handleOnDateChange = (dateRange) => {
    const [startDate, endDate] = dateRange
    let totalDays = moment(endDate).diff(moment(startDate), 'days')
    totalDays += 1

    if (totalDays > user.availableLeaves) {
      toast.error(`Requested date exceeds leave balance of ${user.availableLeaves} days`)
      return null
    }
    setDates([startDate, endDate])
    return null
  }

  const handleApplyLeave = async () => {
    const reason = inputRef.current.value
    if (reason === '') {
      return toast.error('Leave reason is required')
    }

    if (!dates || dates?.length < 2) {
      return toast.error('Start and End dates are required')
    }

    const [startDate, endDate] = dates
    try {
      const res = await createLeaveRecord({
        variables: {
          startDate: moment(startDate).toISOString(),
          endDate: moment(endDate).toISOString(),
          reason,
        },
      })
      const { success = false, message = '' } = res.data?.createLeaveRecord || {}
      if (success) {
        inputRef.current.value = ''
        toast.success(message)
        refetchRecords()
      }
    } catch (error) {
      const message = formatErrorMsg(error)
      toast.error(message)
    }

    return null
  }
  return (
    <div className="text-white md:max-w-90 mx-auto">
      <Header user={user} onBtnClick={handleLogout} />
      <Text variant="h3" className="text-2xl text-start font-bold">
        Apply Leave
      </Text>
      <header>
        <Text className="font-semibold mt-2 mb-1">Select Dates</Text>
        <div className="flex flex-col md:flex-row justify-between gap-y-3 gap-x-3">
          <div className="bg-slate-700 rounded-sm">
            <DatePicker onDateChange={handleOnDateChange} />
          </div>
          <div className="bg-slate-700 rounded-sm flex-1">
            <input
              ref={inputRef}
              type="text"
              placeholder="Leave Reason"
              className="w-full h-full bg-transparent p-3 text-gray-200"
            />
          </div>
          <Button className="w-full md:w-32 rounded-sm p-3" onClick={handleApplyLeave}>
            Apply
          </Button>
        </div>
      </header>
      <Text variant="h3" className="text-2xl my-2 text-start font-light">
        Leave History
      </Text>
      <section className="my-4 flex flex-wrap gap-y-3 md:gap-x-3">
        {data?.leaveRecords?.map((record, idx) => (
          <RecordCard key={idx} record={record} className="bg-slate-700" />
        ))}
      </section>
    </div>
  )
}

export default withProtectedRoute(Dashboard)
