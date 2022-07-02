import ClipLoader from 'react-spinners/ClipLoader'

const Loader = ({ className }) => {
  return (
    <div className={className}>
      <ClipLoader color="white" />
    </div>
  )
}

Loader.defaultProps = {
  className: 'h-80 flex items-center justify-center flex-1',
}
export default Loader
