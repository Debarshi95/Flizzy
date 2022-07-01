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
      <Text className="text-xl text-center md:text-start">Email: {user?.email}</Text>
      <Button className="bg-slate-700 w-40 my-1 py-1" onClick={onBtnClick}>
        Logout
      </Button>
    </section>
  )
}

export default memo(Header)
