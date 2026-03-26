export async function handler(event) {
  const url = event.queryStringParameters?.url;
  if (!url) {
    return { statusCode: 400, body: "Missing url" };
  }

  const range = event.headers.range || "bytes=0-";

  const upstream = await fetch(url, {
    headers: { Range: range }
  });

  if (!upstream.ok && upstream.status !== 206) {
    return {
      statusCode: upstream.status,
      body: "Failed to fetch audio"
    };
  }

  return {
    statusCode: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "audio/mpeg",
      "Accept-Ranges": "bytes",
      "Content-Range": upstream.headers.get("content-range"),
      "Content-Length": upstream.headers.get("content-length"),
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600"
    },
    body: Buffer.from(await upstream.arrayBuffer()).toString("base64"),
    isBase64Encoded: true
  };
}
