// /download: GitHub のリリースに置いたインストーラーを取ってきて、そのまま渡す。
// 友人の画面には、このサイトの URL だけが出る（GitHub の URL を出さない）。
// tools/release/build-site.js が作ったファイル。直すときはそちらを直して作り直す。
const FILE = "ReminderNan-Setup-1.0.0.exe";
const SOURCE = "https://github.com/tetunohako999/reminder-nan/releases/download/v1.0.0/ReminderNan-Setup-1.0.0.exe";

export async function onRequestGet() {
  const upstream = await fetch(SOURCE, { redirect: 'follow' });
  if (!upstream.ok || !upstream.body) {
    return new Response('いまダウンロードできません。少したってから、もう一度試してください。', {
      status: 502,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }
  const headers = new Headers({
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename="' + FILE + '"',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex, nofollow',
  });
  const length = upstream.headers.get('Content-Length');
  if (length) headers.set('Content-Length', length);
  return new Response(upstream.body, { status: 200, headers });
}
