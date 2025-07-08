export async function unshortenUrl(url: string) {
  const redirectUrl = await fetch(`/api/processUrl?processUrl=${url}`).then(
    (res) => res.json()
  )
  return redirectUrl
}
