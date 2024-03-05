const baseUrl = process.env.NEXT_PUBLIC_TORRENT_API_BASE_URL || 'http://localhost:8009';
const endPoint: string = "/api/v1/all/search";
const torrentApiSearchUrl: string = `${baseUrl}${endPoint}`;

export default function searchUrl(query: string) {
  return `${torrentApiSearchUrl}?query=${query}&limit=10`;
}
