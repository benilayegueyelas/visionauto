// Note: On Vercel serverless functions, we can't write to local files persistently
// For a real app, you'd use a database like Vercel Postgres, Supabase, etc.
// This is a placeholder function for now

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const data = req.body;
    data.timestamp = new Date().toISOString();
    
    console.log(`New ${data.type} request received for: ${data.vehicle}`);
    
    // For demo purposes, just return success
    // In production, save to a database
    res.json({ success: true, message: 'Request received successfully.' });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
