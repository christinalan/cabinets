declare module '*.svg' {
    import { FC, SVGProps } from 'react'
    const content: FC<SVGProps<SVGElement>>
    export default content
  }
  
  declare module '*.svg?url' {
      import { StaticImport } from "next/image";
    const content: StaticImport | string;
    export default content
  }