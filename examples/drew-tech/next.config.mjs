import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.jsx',
  unstable_staticImage: true,
  unstable_defaultShowCopyCode: true,
  unstable_readingTime: true,
})

export default withNextra({
  reactStrictMode: true,
  images: {
    domains: ['static.pocketcasts.com']
  },
 
  experimental: {
    newNextLinkBehavior: true,
    images: {
      allowFutureImage: true
    }
  },
  async rewrites() {
    return [
      {
        source: '/api/og/:path*',
        destination: '/api/og'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/newsletter/:slug', // old newsletter URL redirects
        destination: 'https://newsletter.drew.tech/issues/:slug',
        permanent: true
      },
      {
        source: '/how-to-build-side-projects-while-employed-full-time',
        destination: '/posts/divjoy-is-it-worth-it',
        permanent: true
      },
      {
        source: '/on-good-tech-debt',
        destination: '/posts/on-good-tech-debt',
        permanent: true
      },
      {
        source: '/supabase-a-backend-for-indiehackers',
        destination: '/posts/supabase-a-backend-for-indiehackers',
        permanent: true
      },
      {
        source: '/why-nextjs',
        destination: '/posts/why-nextjs',
        permanent: true
      },
      {
        source: '/the-ripple-of-web-vitals',
        destination: '/posts/the-ripple-of-web-vitals',
        permanent: true
      },
      {
        source: "/why-i-didn't-tell-you",
        destination: "/posts/why-i-didn't-tell-you",
        permanent: true
      },
      {
        source: '/vercel-multiple-repos-same-domain',
        destination: '/posts/vercel-multiple-repos-same-domain',
        permanent: true
      },
      {
        source: '/im-your-new-podcast-co-host',
        destination: '/posts/im-your-new-podcast-co-host',
        permanent: true
      },
      {
        source: '/next-js-conf-highlights-2020',
        destination: '/posts/next-js-conf-highlights-2020',
        permanent: true
      },
      {
        source:
          "/a-developer's-guide-building-great-software-incrementally-with-analytics",
        destination:
          "/posts/a-developer's-guide-building-great-software-incrementally-with-analytics",
        permanent: true
      },
      {
        source: '/GAM-re-renders-in-react-gpt',
        destination: '/posts/GAM-re-renders-in-react-gpt',
        permanent: true
      },
      {
        source: '/should-i-use-google-analytics-or-not',
        destination: '/posts/should-i-use-google-analytics-or-not',
        permanent: true
      },
      {
        source: '/one-percent-better-every-day-with-cron-jobs',
        destination: '/posts/one-percent-better-every-day-with-cron-jobs',
        permanent: true
      },
      {
        source: '/posts/one-percent-better-every-day-with-cron-jobs',
        destination: '/posts/cron-jobs-in-nextjs-on-vercel',
        permanent: true
      },
      {
        source: '/giving-away-my-gumroad-side-project',
        destination: '/posts/giving-away-my-gumroad-side-project',
        permanent: true
      },
      {
        source: '/my-principles-for-blogging',
        destination: '/posts/my-principles-for-blogging',
        permanent: true
      },
      {
        source: '/saas-starters-jump-starting-your-saas',
        destination: '/posts//saas-starters-jump-starting-your-saas',
        permanent: true
      },
      {
        source: '/i-turned-off-my-notifications',
        destination: '/posts/i-turned-off-my-notifications',
        permanent: true
      },
      {
        source: '/how-to-send-email-with-vercel-domain-through-gsuite',
        destination:
          '/posts/how-to-send-email-with-vercel-domain-through-gsuite',
        permanent: true
      },
      {
        source: '/notion-beats-markdown',
        destination: '/posts/notion-beats-markdown',
        permanent: true
      },
      {
        source: '/next-js-jobs',
        destination: '/posts/next-js-jobs',
        permanent: true
      },
      {
        source: '/how-i-pick-my-tech-stack-for-side-projects',
        destination: '/posts/how-i-pick-my-tech-stack-for-side-projects',
        permanent: true
      },
      {
        source: '/saas-diligence-instafeed',
        destination: '/posts/saas-diligence-instafeed',
        permanent: true
      },
      {
        source: '/how-to-monitor-core-web-vitals-in-next-js',
        destination: '/posts/how-to-monitor-core-web-vitals-in-next-js',
        permanent: true
      },
      {
        source: "/rome-wasn't-built-in-a-day-and-neither-was-my-saas-app",
        destination:
          "/posts/rome-wasn't-built-in-a-day-and-neither-was-my-saas-app",
        permanent: true
      },
      {
        source: '/how-to-improve-core-web-vitals-in-a-next-js-app',
        destination: '/posts/how-to-improve-core-web-vitals-in-a-next-js-app',
        permanent: true
      },
      {
        source: "/notes-on-naval's-money",
        destination: "/posts/notes-on-naval's-money",
        permanent: true
      },
      {
        source: '/tech-decisions-and-developer-guilt',
        destination: '/posts/tech-decisions-and-developer-guilt',
        permanent: true
      },
      {
        source: '/nextjs-should-be-static',
        destination: '/posts/nextjs-should-be-static',
        permanent: true
      },
      {
        source: '/what-not-to-work-on',
        destination: '/posts/what-not-to-work-on',
        permanent: true
      },
      {
        source: '/divjoy-is-it-worth-it',
        destination: '/posts/divjoy-is-it-worth-it',
        permanent: true
      }
    ]
  }
})
