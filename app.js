import express from 'express';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.use(express.static('public'));

app.get('/api/v1/cats', (req, res) => {
  const cat = {
    cat_id: 1,
    name: 'Milo',
    birthdate: '2023-05-10',
    weight: 4.5,
    owner: 'John',
    image: 'https://loremflickr.com/320/240/cat'
  };

  res.json(cat);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
