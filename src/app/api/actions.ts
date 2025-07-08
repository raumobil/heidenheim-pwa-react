export async function unshortenUrl(url) {
  const redirectUrl = await fetch(`/api/processUrl?processUrl=${url}`).then(
    (res) => res.json()
  )
  return redirectUrl
}
