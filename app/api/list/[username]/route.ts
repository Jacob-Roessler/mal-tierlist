import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const username = request.url.slice(request.url.lastIndexOf('/') + 1);
  let data: Object[] = [];

  try {
    let req = await fetch(
      `https://api.myanimelist.net/v2/users/${username}/animelist?fields=list_status&limit=1000`,
      {
        method: 'get',
        headers: new Headers({
          Authorization: process.env.MAL_TOKEN!,
          'Content-Type': 'application/json',
        }),
      }
    );
    let response = await req.json();
    data = [...data, ...response.data];
    while (response?.paging?.next) {
      let req = await fetch(response.paging.next, {
        method: 'get',
        headers: new Headers({
          Authorization: process.env.MAL_TOKEN!,
          'Content-Type': 'application/json',
        }),
      });
      response = await req.json();
      data = [...data, ...response.data];
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({}, { status: 404, statusText: 'invalid Username' });
  }

  return NextResponse.json(data);
}
