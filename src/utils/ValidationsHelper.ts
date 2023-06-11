
export function isMp4(url: string) {
    if (!url) return false
    return url.includes('.mp4')
}