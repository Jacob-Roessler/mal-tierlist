import { NextResponse } from 'next/server';
const malScraper = require('mal-scraper');

export async function GET(request: Request) {
  const username = request.url.slice(request.url.lastIndexOf('/') + 1);
  let after = 0;
  const type = 'anime'; // can be either `anime` or `manga`
  const status = 7; // All anime
  let prev_data_length = -1;
  let data: Object[] = [];
  while (data.length != prev_data_length) {
    prev_data_length = data.length;
    try {
      let req = await malScraper.getWatchListFromUser(username, after, type, status);
      data = [...data, ...req];
      after += 300;
    } catch (e) {
      return NextResponse.json({}, { status: 404, statusText: 'invalid Username' });
    }
  }

  return NextResponse.json(data);
}
