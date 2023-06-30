'use client'

import { HTMLAttributes } from 'react'

import { siteConfig } from '@/config/site'
import useScroll from '@/lib/hooks/use-scroll'
import { cn } from '@/lib/utils'

import { UserDropdown } from './user-dropdown'
import { IsDesktop } from '../shared/is-desktop'
import { IsMobile } from '../shared/is-mobile'
import { LinkComponent } from '../shared/link-component'
import { ThemeToggle } from '../shared/theme-toggle'

export function Header({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const scrolled = useScroll(50)
  const classes = cn(
    className,
    'fixed top-0 w-full',
    'px-6 lg:px-10 py-3 mb-8 flex items-center',
    {
      'border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:bg-black/50 dark:border-gray-800': scrolled,
    },
    'z-30 transition-all'
  )
  return (
    <header className={classes} {...props}>
      <IsMobile>
        <div className="flex w-full justify-between p-4">
          <LinkComponent className="flex flex-1 items-center " href="/">
            <span className="text-7xl">⏣</span>
          </LinkComponent>
          <div className="">
            <UserDropdown />
          </div>
        </div>
      </IsMobile>
      <IsDesktop>
        <div className="flex w-full justify-between">
          <LinkComponent className="flex items-center" href="/">
            <h1 className="text-gradient-sand ml-2 text-2xl font-bold">{siteConfig.name}</h1>
          </LinkComponent>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </IsDesktop>
    </header>
  )
}
