import express from 'express';
import compression from 'compression';
import path from 'path';

const app = express();
const port = 4221;

app.use(compression());
app.use(express.static(path.join(import.meta.dir, '../dist'), { extensions: ['html'] }));

// fallback
app.use((req, res) => {
    if (req.accepts('html')) {
        res.status(404).redirect('/');
    } else {
        res.status(404).json({ error: { message: 'Route not found', statusCode: 404 } });
    }
});

app.listen(port, () => {
    console.log(`Serving public files at http://localhost:${port}`)
})