const config = {
  footer: (
    <small style={{ display: 'block', marginTop: '8rem' }}>
      <time>{new Date().getFullYear()}</time> © Drew Bredvick.
      <a href="/feed.xml">RSS</a>
      <style jsx>{`
        a {
          float: right;
        }
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </small>
  ),
  unstable_defaultShowCopyCode: true,
  unstable_readingTime: true,
  titleSuffix: ' — drew.tech',
  cusdis: {
    appId: 'cf5820c3-3998-40a8-a8dc-c5c769022fee'
  },
  navs: [{ url: '/tags/podcast', name: 'Podcasts' }, { url: "/tags/log", name: "Logs" }],
  postFooter: (
    <div className="">
      <div
        style={{
          display: 'block',
          border: '.5px solid #bfdbfe',
          padding: '24px',
          borderRadius: '4px',
          marginTop: '48px'
        }}
      >
        <h3 style={{ margin: '0px', marginBottom: '12px', padding: '0px' }}>
          Interested in reading more?
        </h3>
        <p style={{ margin: '0px', padding: '0px', marginBottom: '32px' }}>
          Get each post sent to your inbox about once or twice a month.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            fetch('/api/subscribe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: e.target.email.value
              })
            }).then(async (res) => {
              if (res.status === 200) {
                alert(
                  'Thanks for subscribing! Check your email for a confirmation email.'
                )
                e.target.email.value = ''
              } else {
                const data = await res.json()
                alert(data.message)
              }
            })
          }}
          style={{ position: 'relative' }}
        >
          <input
            name="email"
            placeholder="hey@drew.tech"
            className=""
            style={{
              border: '1px solid #e5e7eb',
              padding: '0.4rem',
              width: '50%',
              borderRadius: '4px',
              width: '100%'
            }}
            type="email"
          />
          <button
            type="submit"
            className="text-gray-400
                hover:text-gray-500
                dark:text-gray-300
                dark:hover:text-gray-200
                bg-gray-200
                hover:bg-gray-300
                dark:bg-gray-600
                dark:hover:bg-gray-700"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyItems: 'center',
              position: 'absolute',
              right: 6,
              top: 6,
              paddingTop: '12px',
              paddingRight: '24px',
              paddingBottom: '12px',
              paddingLeft: '24px',
              fontWeight: 'bold',
              height: '2rem',
              borderRadius: '4px'
            }}
          >
            Subscribe
          </button>
        </form>
        <div>
          <a
            href="https://signup.drew.tech/"
            className="
                select-none
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
            target="_blank"
          >
            Read the latest issue
          </a>
        </div>
      </div>
    </div>
  ),
  darkMode: true
}

export default config
