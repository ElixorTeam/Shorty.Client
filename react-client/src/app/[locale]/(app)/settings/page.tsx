const url = 'http://localhost:8082/linkshortener/links/create'

async function sendData(data: string) {
  const req = await fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json; charset=utf8'
    }
  })
  return req.json()
}

export default async function Settings() {
  const dataForm = {
    ref: 'https://www.youtube.com',
    title: '12345',
    active: true
  }
  const data = await sendData(JSON.stringify(dataForm))
  console.log(data)
  return <p>Settings</p>
}
