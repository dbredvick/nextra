import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const meta = {
      title: 'drew.tech — side projects and startups with Next.js.',
      description:
        'I write about modern web dev, building and growing SaaS apps, and interesting things I find on the internet.'
    }
    const testVal = this.props.html.indexOf('<h1>')
    const testVal2 = this.props.html.indexOf('</h1>')
    const title = this.props.html.slice(testVal + 4, testVal2)

    return (
      <Html lang="en">
        <Head>
          <meta name="robots" content="follow, index" />
          <meta name="description" content={meta.description} />
          <meta property="og:site_name" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={title || meta.title} />
          <link
            rel="icon"
            href={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='.9em' font-size='90' text-anchor='middle'>📝</text><style>text{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";fill:black}@media(prefers-color-scheme:dark){text{fill:white}}</style></svg>`}
          />

          <meta name="twitter:site" content="@dbredvick" />
          <meta name="twitter:title" content={title || meta.title} />
          <meta name="twitter:description" content={meta.description} />
          {process.env.NODE_ENV === 'production' && (
            <script
              async
              defer
              data-website-id="fd24503f-2e52-49d4-adf6-d34272939ee3"
              src="https://data.drew.tech/umami.js"
              data-domains="drew.tech,www.drew.tech,drews-new-blog.vercel.app"
            ></script>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
