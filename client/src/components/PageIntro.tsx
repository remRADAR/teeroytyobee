import type { ReactNode } from 'react'

export function PageIntro({ eyebrow, title, children, aside }: { eyebrow: string; title: string; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="page-intro wrap">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children && <div className="intro-copy">{children}</div>}
      </div>
      {aside && <div className="intro-aside">{aside}</div>}
    </section>
  )
}
