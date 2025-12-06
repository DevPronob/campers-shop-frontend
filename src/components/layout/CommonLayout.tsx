import React from 'react'

export default function CommonLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="max-w-screen-xl mx-auto">
        {children}
    </div>
  )
}
