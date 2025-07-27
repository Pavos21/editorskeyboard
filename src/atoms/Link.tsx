import React from 'react'

interface LinkProps {
  linkTo: string
  linkName: string
  children?: React.ReactNode
  onClick?: () => void
}

const Link: React.FC<LinkProps> = ({ linkTo, linkName, children, onClick }) => {
  return (
    <a
      className="underline"
      href={linkTo}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {linkName}
      {children}
    </a>
  )
}

export default Link