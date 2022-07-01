import moment from 'moment'
import cn from 'clsx'
import { memo } from 'react'
import { Text, Button } from 'components'

const RecordCard = ({ record, className, role }) => {
  return (
    <div className={cn('text-gray-50 w-full md:w-fit p-4 rounded-sm', className)}>
      <Text className="text-base">Start Date: {moment(record.startDate).format('YYYY-MM-DD')}</Text>
      <Text className="text-base">End Date: {moment(record.endDate).format('YYYY-MM-DD')}</Text>
      <Text className="my-1 text-lg">Reason: {record.reason}</Text>
      {role === 'HR' ? (
        <Button className="bg-blue-600 rounded-sm my-1 text-sm font-semibold p-2">
          {record.leaveStatus}
        </Button>
      ) : (
        <Text className="bg-blue-600 rounded-sm my-1 text-sm font-semibold p-2">
          Status: {record.leaveStatus}
        </Text>
      )}
    </div>
  )
}

export default memo(RecordCard)
