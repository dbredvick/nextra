import { getLatestRevueIssue } from '../../lib/get-revue-issues'

const handler = async (req, res) => {
  const data = await getLatestRevueIssue()
  console.log(data)
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate')
  return res.redirect(data)
}
export default handler
