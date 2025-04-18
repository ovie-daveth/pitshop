import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='relative flex h-screen w-full overflow-hidden '>
      <div className='w-[600px] '>
     <div className='max-h-full overflow-y-auto hide-sidebar'>
        {children}
     </div>
      </div>
      <div className="block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
    </div>
  )
}

export default AuthLayout
