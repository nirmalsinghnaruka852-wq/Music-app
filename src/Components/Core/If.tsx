import { ReactNode } from 'react';

type IfProps = {
  condition: boolean;
  children: ReactNode;
};

function If({ condition, children }: IfProps) {
  return  condition && <>{children}</>;
}
export default If;
