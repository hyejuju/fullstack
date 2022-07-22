import React from 'react'

const Notification = ({ message }) => {
  if (!message || message ==='') {
    return null
  }

  return (
    <div className='notification'>
      miii{message}
    </div>
  )
}

export default Notification