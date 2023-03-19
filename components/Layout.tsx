// components/Layout.tsx
import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header>
        {/* ヘッダーコンポーネント */}
      </header>

      <main>{children}</main>

      <footer>
        {/* フッターコンポーネント */}
      </footer>
    </div>
  )
}
