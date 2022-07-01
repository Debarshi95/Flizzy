import ReactDatePicker from 'react-datepicker'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

const DatePicker = ({ onDateChange }) => {
  const [dateRange, setDateRange] = useState([new Date(), null])
  const [startDate, endDate] = dateRange

  return (
    <ReactDatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update)
        if (!update.includes(null)) {
          onDateChange(update)
        }
      }}
      className="bg-transparent w-fit p-2"
    />
  )
}

DatePicker.defaultProps = {
  onDateChange: () => null,
}

export default DatePicker
