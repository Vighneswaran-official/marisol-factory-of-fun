import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function youtubeSearchPlugin(): Plugin {
  return {
    name: 'youtube-search-api',
    configureServer(server) {
      server.middlewares.use('/api/youtube-search', async (req, res) => {
        try {
          const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
          const query = url.searchParams.get('q') || '';
          if (!query.trim()) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing query' }));
            return;
          }

          const fetchRes = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query.trim() + ' song')}`, {
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
                  channel: v.ownerText?.runs?.[0]?.text || 'YouTube Music',
                  duration: v.lengthText?.simpleText || '',
                  thumbnail: `https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`
                });
              }
              if (results.length >= 12) break;
            }
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({ results }));
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: message, results: [] }));
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), youtubeSearchPlugin()],
})

