import React, { ReactElement } from 'react'
import Link from 'next/link'
import ThemeSwitch from './theme-switch'
import type { NextraBlogTheme } from './types'
import { split } from './utils/get-tags'

interface MetaProps {
  author?: string
  date?: string
  tag?: string | string[]
  back?: string | null
  config: NextraBlogTheme
}

export default function Meta({
  author,
  date,
  tag,
  back,
  config
}: MetaProps): ReactElement {
  const tags = tag ? split(tag) : []

  return (
    <div className="mb-8 flex items-center gap-3">
      <div className="flex flex-1 flex-wrap items-center gap-1 text-gray-400 not-prose">
        {author}
        {author && date && ','}
        {date && (
          <time dateTime={new Date(date).toISOString()}>
            {new Date(date).toDateString()}
          </time>
        )}
        {(author || date) && tags.length > 0 && '•'}
        {tags.map(t => (
          <Link key={t} href="/tags/[tag]" as={`/tags/${t}`}>
            <a
              className="
                select-none
                rounded-md
                px-1
                transition-colors
                text-sm
                text-gray-400
                hover:text-gray-500
                dark:text-gray-300
                dark:hover:text-gray-200
                bg-gray-200
                hover:bg-gray-300
                dark:bg-gray-600
                dark:hover:bg-gray-700
              "
            >
              {t}
            </a>
          </Link>
        ))}
      </div>
      {back && (
        <Link href={back} passHref>
          <a>Back</a>
        </Link>
      )}
      {config.darkMode && <ThemeSwitch />}
    </div>
  )
}
