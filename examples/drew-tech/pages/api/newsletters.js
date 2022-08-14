const Newsletters = async (req, res) => {
  const baseUrl = 'https://www.getrevue.co/api'
  const response = await fetch(`${baseUrl}/v2/issues`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.REVUE_API}` }
  })

  const data = await response.json()
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
  res.status(200)
  res.json(
    data.map((x) => ({
      ...x,
      html: '',
      description: x.description
        .replace('<p>', '')
        .replace('</p>', '')
        .replace('&amp;', '&')
        .replace('<p>', '')
        .replace('</p>', '')
        .replace('<br>', ''),
      url: x.url.replace(
        'https://www.getrevue.co/profile/dbredvick/issues',
        'https://newsletter.drew.tech/issues'
      )
    }))
  )
}
export default Newsletters
