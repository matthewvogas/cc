import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  const pages = await db.instagramPages.findMany({
    where: {
      userId: String(id),
    },
  })

  interface UserInfo {
    followers: number;
    id: string;
  }

  interface Usernames {
    [key: string]: UserInfo;  
  }
  
  let maxFollowers = 0;
  let maxPage = null;

  for (let page of pages) {
    const followers = parseInt(page.followers_count, 10);
    if (followers > maxFollowers) {
      maxFollowers = followers;
      maxPage = page;
    }
  }

  const usernames: Usernames = {}
  if (maxPage) {
    usernames[maxPage.username] = {
      followers: maxFollowers,
      id: maxPage.id,
    };
  }

  return NextResponse.json({ usernames })
}