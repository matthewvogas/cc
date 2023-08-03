import { TiktokOembed } from '@/types/TiktokTypes'

export default class TiktokService {
  static async getPostInfo(url: string): Promise<TiktokOembed | null> {
    const oemBedUrl = new URL('https://www.tiktok.com/oembed/')
    oemBedUrl.searchParams.append('url', url)

    try {
      const res = await fetch(oemBedUrl.toString())
      const data = await res.json()

      if (res.status !== 200 || !data.thumbnail_url) {
        console.log(oemBedUrl.toString())
        console.log('Tiktok Oembed Error', data.error || data)
        return null
      }

      return data as TiktokOembed
    } catch (e) {
      console.log('TiktokOembed', e)
    }
    return null
  }
}
