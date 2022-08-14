import { default as FormData } from 'form-data'
const Newsletters = async (req, res) => {
  console.log(req.body)
  const baseUrl = 'https://www.getrevue.co/api'
  const formData = new FormData()
  formData.append('email', req.body.email)
  const response = await fetch(`${baseUrl}/v2/subscribers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REVUE_API}`
    },
    body: formData
  })

  const data = await response.json()
  console.log(data)
  if (data?.error?.email.length > 0) {
    return res.status(400).json({
      message: data.error.email[0]
    })
  } else {
    return res.status(200).json({
      message: 'Successfully subscribed'
    })
  }
}
export default Newsletters
