var express = require('express');
var morgan = require('morgan');
var path = require('path');

const { Pool, Client } = require('pg');

var config = {
  user: 'chrishanthmathew91',
  host: 'db.imad.hasura-app.io',
  database: 'chrishanthmathew91',
  port: 5432,
  password: process.env.DB_PASSWORD,
}

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
      title: 'Article One | Chrishanth Mathew',
      heading: 'Article One',
      date: 'Aug 7, 2017',
      content: 
            `<p>
                This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article.
            </p>
            <p>
                This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article.
            </p>
            <p>
                This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article.
            </p>`
    },
    'article-two': {
      title: 'Article Two | Chrishanth Mathew',
      heading: 'Article Two',
      date: 'Aug 8, 2017',
      content: 
            `<p>
                This is the content for my second article. 
            </p>`},
    'article-three': {
      title: 'Article Three | Chrishanth Mathew',
      heading: 'Article Three',
      date: 'Aug 9, 2017',
      content: 
            `<p>
                This is the content for my third article. 
            </p>`
    }
};

function createTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scaled" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res) {
    pool.query('SELECT * FROM test', function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter += 1;
    res.send(counter.toString());
});

var comments = [];
var names = [];
app.get('/submit-comment', function (req, res) {
    var comment = req.query.comment;
    var name = req.query.name;
    comments.push(comment)
    names.push(name);
    var jsonarray = [];
    for (i=0; i<names.length; i++) {
        jsonarray.push({
            name: names[i],
            comment: comments[i]
        });
    }
    res.send(JSON.stringify(jsonarray));
});

app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
