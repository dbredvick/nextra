import Head from 'next/head'
import 'nextra-theme-blog/style.css'
import '../styles/main.css'

export default function Nextra({ Component, pageProps, router }) {
    return (
        <>
            <Head>
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="RSS"
                    href="/feed.xml"
                />
                <link
                    rel="preload"
                    href="/fonts/Inter-roman.latin.var.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </Head>
            <Component {...pageProps} />
        </>
    )
}
