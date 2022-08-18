const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

async function generate() {
  const feed = new RSS({
    title: 'drew.tech — side projects and startups with Next.js.',
    site_url: 'https://drew.tech',
    feed_url: 'https://drew.tech/feed.xml'
  })

  const posts = await fs.readdir(path.join(__dirname, '..', 'pages', 'posts'))

  const logs = await fs.readdir(path.join(__dirname, '..', 'pages', 'logs'))

  const podcasts = await fs.readdir(
    path.join(__dirname, '..', 'pages', 'podcasts')
  )

  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith('index.')) return

      if (name.startsWith('_')) return

      const content = await fs.readFile(
        path.join(__dirname, '..', 'pages', 'posts', name)
      )
      const frontmatter = matter(content)

      feed.item({
        title: frontmatter.data.title,
        url: '/posts/' + name.replace(/\.mdx?/, ''),
        date: frontmatter.data.date,
        description: frontmatter.data.description,
        categories: frontmatter.data.tag && frontmatter.data.tag.split(', '),
        author: frontmatter.data.author
      })
    }),
    podcasts.map(async (name) => {
      if (name.startsWith('index.')) return

      if (name.startsWith('_')) return

      const content = await fs.readFile(
        path.join(__dirname, '..', 'pages', 'podcasts', name)
      )
      const frontmatter = matter(content)

      feed.item({
        title: frontmatter.data.title,
        url: '/podcasts/' + name.replace(/\.mdx?/, ''),
        date: frontmatter.data.date,
        description: frontmatter.data.description,
        categories: frontmatter.data.tag && frontmatter.data.tag.split(', '),
        author: frontmatter.data.author
      })
    }),
    logs.map(async (name) => {
      if (name.startsWith('index.')) return

      if (name.startsWith('_')) return

      const content = await fs.readFile(
        path.join(__dirname, '..', 'pages', 'logs', name)
      )
      const frontmatter = matter(content)

      feed.item({
        title: frontmatter.data.title,
        url: '/logs/' + name.replace(/\.mdx?/, ''),
        date: frontmatter.data.date,
        description: frontmatter.data.description,
        categories: frontmatter.data.tag && frontmatter.data.tag.split(', '),
        author: frontmatter.data.author
      })
    })
  )

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
}

generate()
