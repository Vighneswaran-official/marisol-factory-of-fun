export default async function handler(req: any, res: any) {
  try {
    const query = (req.query?.q || '').toString().trim();
    if (!query) {
      return res.status(400).json({ error: 'Missing query parameter', results: [] });
    }

    const fetchRes = await fetch(https://www.youtube.com/results?search_query=, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    const html = await fetchRes.text();
    const match = html.match(/var ytInitialData = ({.*?});<\/script>/) || html.match(/ytInitialData\s*=\s*({.+?});/);
    const results: Array<{
      videoId: string;
      title: string;
      channel: string;
      duration: string;
      thumbnail: string;
    }> = [];

    if (match) {
      const json = JSON.parse(match[1]);
      const contents = json.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || [];
      for (const item of contents) {
        const v = item.videoRenderer;
        if (v && v.videoId) {
          results.push({
            videoId: v.videoId,
            title: v.title?.runs?.[0]?.text || 'YouTube Song',
            channel: v.ownerText?.runs?.[0]?.text || 'YouTube Creator',
            duration: v.lengthText?.simpleText || '',
            thumbnail: https://img.youtube.com/vi//mqdefault.jpg
          });
        }
        if (results.length >= 12) break;
      }
    }

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ results });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Server error', results: [] });
  }
}
