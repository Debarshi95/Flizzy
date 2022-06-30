import ReactModal from 'react-modal'

ReactModal.setAppElement(document.querySelector('body'))

const Modal = ({ onClose, isOpen, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      style={{
        content: {
          background: '#475569',
          border: 0,
          padding: '1rem',
          inset: '5rem 0',
          height: '80%',
          maxWidth: '28rem',
          margin: '0 auto',
          width: '100%',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 999,
        },
      }}
    >
      <div className="bg-slate-600">{children}</div>
    </ReactModal>
  )
}

export default Modal
