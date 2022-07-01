const Row = ({ employee, ...props }) => {
  return (
    <div
      role="button"
      className="bg-slate-600 p-2 mb-2 w-full hover:bg-slate-700 hover:border-slate-700 hover:border cursor-pointer"
      {...props}
    >
      <table className="w-full table-fixed flex md:table justify-between">
        <thead>
          <tr className="text-gray-200 font-extralight flex flex-col md:table-row items-start">
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Designation</th>
            <th>Salary(LPA)</th>
            <th>Leaves</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          <tr className="md:text-center font-light text-ellipsis text-base md:text-sm flex flex-col md:table-row items-center">
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.phoneNumber}</td>
            <td>{employee.designation || 'Not assigned'}</td>
            <td>{employee.salary || 0}</td>
            <td>{employee.availableLeaves}</td>
            <td>{employee.active ? 'ACTIVE' : 'NOT ACTIVE'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Row
