'use server'
export async function unshortenUrl(url: string) {
  const redirectUrl = await fetch(url, {
    method: 'head',
    redirect: 'manual',
  }).then((res) => {
    return res?.headers?.get('location')
  })
  return redirectUrl
}
