import { twMerge } from 'tailwind-merge'

const baseStyles = 'text-blue-600'
export const linkStyles = `${baseStyles} underline`
export const buttonStyles = `${baseStyles} rounded-full border border-blue-600 px-6 pt-4 pb-3`

type Props = {
  to: string
  className?: string
  /** @default `false` */
  blank?: boolean
  /** @desc Style Link as Button */
  button?: boolean
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = ({ to, className, children, blank = false, button, ...props }: Props) => {
  return (
    <a
      href={to}
      className={twMerge(button ? buttonStyles : linkStyles, className)}
      {...{ target: blank ? '_blank' : undefined }}
      {...props}
    >
      {children}
    </a>
  )
}
