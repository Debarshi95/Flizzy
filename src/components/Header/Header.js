import { memo } from 'react'
import { Text, Button } from 'components'

const Header = ({ user, onBtnClick, ...props }) => {
  return (
    <section
      className="mb-4 border-slate-600 border w-fit mx-auto py-4 px-4 md:px-8 rounded-md"
      {...props}
    >
      <Text variant="h1" className="text-3xl text-center">
        Hello, {user?.name}
      </Text>
      <div className="text-base text-center md:text-start">
        <Text>Email: {user?.email}</Text>
        <Text>Designation: {user?.designation}</Text>
        <Text>Salary: {user?.salary}LPA</Text>
        <Text>Available Leaves: {user?.availableLeaves}</Text>
      </div>
      <Button className="bg-slate-700 w-40 my-1 py-1" onClick={onBtnClick}>
        Logout
      </Button>
    </section>
  )
}

export default memo(Header)
