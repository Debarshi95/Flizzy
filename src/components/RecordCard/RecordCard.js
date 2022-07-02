import moment from 'moment'
import cn from 'clsx'
import { memo } from 'react'
import { Text, Select } from 'components'

const menuOptions = [
  {
    label: 'PENDING',
    value: 'PENDING',
  },
  {
    label: 'APPROVE',
    value: 'APPROVE',
  },
  {
    label: 'REJECT',
    value: 'REJECT',
  },
]

const RecordCard = ({ record, className, userRole, onBtnClick }) => {
  return (
    <div className={cn('text-gray-50 w-full md:w-fit p-4 rounded-sm', className)}>
      <Text className="text-base">Start Date: {moment(record.startDate).format('YYYY-MM-DD')}</Text>
      <Text className="text-base">End Date: {moment(record.endDate).format('YYYY-MM-DD')}</Text>
      <div className="flex items-center justify-between">
        <Text className="text-base flex-1">Reason: {record.reason}</Text>
        {userRole === 'HR' && (
          <Select
            className="border-slate-600 border self-end bg-slate-600 rounded-sm my-1 flex-1 text-sm font-semibold p-1 ml-10"
            onClick={() => onBtnClick}
            options={menuOptions}
            defaultValue={record.leaveStatus}
          />
        )}
      </div>
      {userRole !== 'HR' && (
        <Text className="bg-blue-600 rounded-sm my-1 text-sm font-semibold p-2">
          Status: {record.leaveStatus}
        </Text>
      )}
    </div>
  )
}

RecordCard.defaultProps = {
  onBtnClick: () => null,
}

export default memo(RecordCard)
