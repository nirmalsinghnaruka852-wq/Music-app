import { ReactElement, ReactNode } from "react"

type ShowWhenProps = {
  when: boolean
  children: ReactNode
  otherwise?: ReactNode
}

export default function ShowWhen({ when, children, otherwise=null }: ShowWhenProps) {
  return when ? children: otherwise
}