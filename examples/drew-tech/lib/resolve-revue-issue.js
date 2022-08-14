import { fetchTweetAst } from 'static-tweets/build/esm/fetchTweetAst'
import pMap from 'p-map'
import ReactDOMServer from 'react-dom/server'
import React from 'react'

export async function resolveRevueIssue(slug) {
  const baseUrl = 'https://www.getrevue.co/api'

  const res = await fetch(`${baseUrl}/v2/issues`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.REVUE_API}` }
  })
  const data = await res.json()
  const issues = data.map((x) => ({
    ...x,
    url: x.url.replace('https://www.getrevue.co/profile/dbredvick/issues/', '')
  }))
  const result = issues.filter((x) => x.url === slug)[0]

  const embedRegex =
    /\[embed https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)\]/g
  const tweetRegex =
    /\[tweet https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)\]/g

  const captionRegex = /\[caption align="alignnone" width="980"\]/g
  const captionEndRegex = /\[\/caption\]/g
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

  const captionStarts = result.html.matchAll(captionRegex)
  const captionEnds = result.html.matchAll(captionEndRegex)
  const embeds = result.html.matchAll(embedRegex)
  const tweets = result.html.matchAll(tweetRegex)

  const tweetData = [...tweets]
  const tweetIds = tweetData.map((tweet) => {
    return tweet[2].split('/')[3]
  })
  const tweetAsts = await pMap(
    tweetIds,
    async (tweetId) => {
      try {
        return {
          tweetId,
          tweetAst: await fetchTweetAst(tweetId)
        }
      } catch (err) {
        console.error('error fetching tweet info', tweetId, err)
      }
    },
    {
      concurrency: 4
    }
  )

  const tweetAstMap = tweetAsts.reduce((acc, { tweetId, tweetAst }) => {
    if (tweetAst) {
      return {
        ...acc,
        [tweetId]: tweetAst
      }
    } else {
      return acc
    }
  }, {})

  result.tweetAstMap = tweetAstMap

  tweetData.map((currentTweet) => {
    const id = currentTweet[2].split('/')[3]
    const html = ReactDOMServer.renderToStaticMarkup(
      React.createElement(
        'tweet',
        {
          tweetid: tweetAstMap[id][0].data.id
        },
        'hello'
      )
    )
    return (result.html = result.html.replace(currentTweet[0], html))
  })

  // render tweets to html
  // insert them where they go https://stackoverflow.com/questions/29586411/react-js-is-it-possible-to-convert-a-react-component-to-html-doms

  const embedFinds = [...embeds]
  embedFinds.map((embed) => {
    const url = embed[0].match(urlRegex)
    const iframeHtml = `<iframe src="https://player.vimeo.com/video${
      [...url][2]
    }" style='width: 100%;' frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
    return (result.html = result.html.replace(embed[0], iframeHtml))
  })

  const captionFinds = [...captionStarts]
  captionFinds.map((caption) => {
    return (result.html = result.html.replace(caption[0], ''))
  })

  const captionEndsFinds = [...captionEnds]
  captionEndsFinds.map((caption) => {
    return (result.html = result.html.replace(caption[0], ''))
  })
  return result
}
