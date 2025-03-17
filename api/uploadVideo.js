export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ code: 405, message: 'Method Not Allowed' });
    return;
  }

  const body = req.body;
  res.status(200).json({
    code: 200,
    message: '成功',
    url: body.url
  });
}