const express = require('express');
const path = require('path');
const app = express(); //tehdään express appi

const PORT = process.env.PORT || 3000; // portti, jolla serveri kuuntelee


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


app.use(express.static(path.join(__dirname, 'public'))); // staattisten tiedostojen tarjoaminen 'public' kansiosta


// home sivu
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// about sivu
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Contact sivu
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

const apiRouter = express.Router(); // API reititin

// tehdään API reittipolku /api/time joka palauttaa nykyisen ajan JSON muodossa
apiRouter.get('/time', (req, res) => {
    const now = new Date();
    res.json({
        datetime: now.toISOString(),
        timestamp: now.getTime()
    });
});

// tehdään API reittipolku /api/info joka palauttaa tietoa serveristä JSON muodossa
apiRouter.get('/info', (req, res) => {
    res.json({
        name: 'Workshop03 Express Server',
        version: '1.0.0',
        nodeVersion: process.version
    });
});

// käytetään API reititintä /api polussa
app.use('/api', apiRouter);


// 404 handler, jos mikään reitti ei täsmää, palautetaan 404 sivu
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// 500 handler, jos tapahtuu serveri virhe, palautetaan 500 sivu
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Käynnistetään serveri kuuntelemaan määritettyä porttia
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log('Available routes: /, /about, /contact, /api/time, /api/info');
});
