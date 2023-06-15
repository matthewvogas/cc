export function isMp4(url: string) {
  if (!url) return false
  return url.includes('.mp4')
}

export function isVideo(post: any) {
  if (post.videoUrl) return true
  return false
}


export const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then(res => res.json())
