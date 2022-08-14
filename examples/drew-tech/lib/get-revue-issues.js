export async function getRevueIssues() {
  const baseUrl = 'https://www.getrevue.co/api'

  const res = await fetch(`${baseUrl}/v2/issues`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.REVUE_API}` }
  })
  const data = await res.json()
  return data.map((x) => x.url)
}

export async function getRevueIssuesData() {
  const baseUrl = 'https://www.getrevue.co/api'

  const res = await fetch(`${baseUrl}/v2/issues`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.REVUE_API}` }
  })
  console.log(res)
  const data = await res.json()
  return data.map((x) => ({
    ...x,
    description: x.description
      .replace('<p>', '')
      .replace('</p>', '')
      .replace('&amp;', '&')
      .replace('<p>', '')
      .replace('</p>', '')
      .replace('<br>', ''),
    url: x.url.replace(
      'https://www.getrevue.co/profile/dbredvick',
      'https://newsletter.drew.tech'
    )
  }))
}

export async function getLatestRevueIssue() {
  const baseUrl = 'https://www.getrevue.co/api'

  const res = await fetch(`${baseUrl}/v2/issues/latest`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.REVUE_API}` }
  })
  console.log(res)
  const data = await res.json()
  return data.issue[0].url.replace(
    'https://www.getrevue.co/profile/dbredvick',
    'https://newsletter.drew.tech'
  )
}
