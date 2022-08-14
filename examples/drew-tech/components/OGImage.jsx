import Head from 'next/head'

export default function OGImage({ title, image }) {
    const url = new URL(`https://drew.tech/api/og/${title}`);
    if (image) {
        url.searchParams.set('image', image);
    }
    if (title) {
        url.searchParams.set('title', title);
    }

    return <Head>
        <meta
            property="og:image"
            content={url.href}
        />
        <meta name="twitter:card" content="summary_large_image" />
    </Head>
}
