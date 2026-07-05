const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const DB_FILE = path.join(__dirname, 'requests.json');

// Initialize requests database
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

app.post('/api/submit', (req, res) => {
    try {
        const data = req.body;
        data.timestamp = new Date().toISOString();
        
        const requests = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
        requests.push(data);
        fs.writeFileSync(DB_FILE, JSON.stringify(requests, null, 2));
        
        console.log(`New ${data.type} request received for: ${data.vehicle}`);
        res.json({ success: true, message: 'Request saved successfully.' });
    } catch (error) {
        console.error('Error saving request:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
