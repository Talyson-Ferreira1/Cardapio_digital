export function GenerateRandomId() {
  let length = 15
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomId = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomId += characters.charAt(randomIndex)
  }

  return randomId
}
