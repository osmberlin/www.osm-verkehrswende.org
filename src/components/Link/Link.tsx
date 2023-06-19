import classNames from 'classnames'

const baseStyles = 'text-rs8-pink hover:text-rs8-blue'
export const linkStyles = `${baseStyles} underline`
export const buttonStyles = `${baseStyles} rounded-full border border-rs8-pink px-6 pt-4 pb-3`

type Props = {
  to: string
  className?: string
  /** @default `false` */
  blank?: boolean
  /** @desc Style Link as Button */
  button?: boolean
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const Link: React.FC<Props> = ({
  to,
  className,
  children,
  blank = false,
  button,
  ...props
}) => {
  return (
    <a
      href={to}
      className={classNames(button ? buttonStyles : linkStyles, className)}
      {...{ target: blank ? '_blank' : undefined }}
      {...props}
    >
      {children}
    </a>
  )
}
