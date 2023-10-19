import { twMerge } from 'tailwind-merge'
import { buttonStyles, linkStyles } from './Link'

type Props = {
  className?: string
  /** @desc Default: `true` */
  blank?: boolean
  /** @desc Style Link as Button */
  button?: boolean
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const LinkExternal: React.FC<Props> = ({
  className,
  children,
  button,
  blank = true,
  ...props
}) => {
  return (
    <a
      className={twMerge(button ? buttonStyles : linkStyles, className)}
      rel="noopener noreferrer"
      {...{ target: blank ? '_blank' : undefined }}
      {...props}
    >
      {children}
    </a>
  )
}
