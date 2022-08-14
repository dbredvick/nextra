const handler = async (req, res) => {
  console.log(JSON.stringify(req.headers))
  return res.json({ message: 'hello, world!' })
}

export default handler
