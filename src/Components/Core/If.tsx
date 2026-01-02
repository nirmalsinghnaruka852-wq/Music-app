import { ReactElement } from "react"

type IfProps = {
  condition: boolean
  children: ReactElement
}

function If({ condition, children }: IfProps) {
  return condition ? children: null
}

export default If