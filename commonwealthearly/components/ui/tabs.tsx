import * as React from "react"

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
}

const Tabs = ({ className = "", defaultValue, ...props }: TabsProps) => {
  return (
    <div className={className} {...props} data-value={defaultValue} />
  )
}
Tabs.displayName = "Tabs"

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsList = ({ className = "", ...props }: TabsListProps) => {
  return (
    <div className={`flex ${className}`} role="tablist" {...props} />
  )
}
TabsList.displayName = "TabsList"

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const TabsTrigger = ({ className = "", value, ...props }: TabsTriggerProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const parent = e.currentTarget.closest('[data-value]')
    if (parent) {
      parent.setAttribute('data-value', value)
    }
    if (props.onClick) {
      props.onClick(e)
    }
  }

  // Check if this trigger is the active one by comparing with parent's data-value
  const isActive = () => {
    if (typeof document !== 'undefined') {
      const parent = document.querySelector(`[data-value="${value}"]`)
      return parent && parent.getAttribute('data-value') === value
    }
    return false
  }

  return (
    <button
      className={className}
      role="tab"
      data-state={isActive() ? "active" : "inactive"}
      onClick={handleClick}
      {...props}
    />
  )
}
TabsTrigger.displayName = "TabsTrigger"

export { Tabs, TabsList, TabsTrigger } 