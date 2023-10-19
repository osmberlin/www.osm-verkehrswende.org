import { twMerge } from 'tailwind-merge'
import { buttonStyles, linkStyles } from './Link'

type Props = {
  className?: string
  mailto?: string
  blank?: boolean
  /** @desc Style Link as Button */
  button?: boolean
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const LinkMail: React.FC<Props> = ({ className, mailto, button, children, ...props }) => {
  return (
    <a
      href={`mailto:${mailto || children}`}
      className={twMerge(button ? buttonStyles : linkStyles, className)}
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  )
}
