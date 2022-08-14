import { getTime, subDays } from 'date-fns'

const handler = async (req, res) => {
  const tenYearsAgo = subDays(new Date(), 365 * 10)

  const results = await fetch(
    `https://data.drew.tech/api/website/6/pageviews?start_at=${getTime(
      tenYearsAgo
    )}&end_at=${getTime(
      new Date()
    )}&unit=year&tz=America%2FDenver&url=${encodeURIComponent(req.query.url)}`,
    {
      headers: {
        Cookie: `umami.auth=${process.env.UMAMI_API_TOKEN}`
      }
    }
  )
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59')
  res.send(await results.json())
}

export default handler
