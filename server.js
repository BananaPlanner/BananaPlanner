const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
var db;
MongoClient.connect('mongodb+srv://admin:5328@root51.fyq2cjz.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, function (err, client) {
    if (err) {
        return console.log(err)
    }
    db = client.db('bananaPlanner');

    app.listen(8080, function () {
        console.log('listening on 8080')
    }
    );


})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/hompage.html');
});
app.get('/login.html', function (req, res) {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


/*Diary */
app.post('/addDiary', function (req, res) { //add Diary
    db.collection('diarylist').insertOne({
        date: req.body.date,
        diary: req.body.diary,
        emotion: req.body.emotion,
    }, function (err, res) {
        console.log('[server] diary  : 저장완료')

    })

})
app.post('/updateDiary', function (req, res) {//update Diary
    db.collection('diarylist').updateOne(
        { date: req.body.date }, 
        {
            $set:
            {
                diary: req.body.diary,
                emotion: req.body.emotion
            }
        }, 
        function (err, res) {
            if (err) {
                console.log("Update failed");
            } else {
                console.log('[server] diary  : 수정완료')
            }
        }
    );
});

/*todo list */
app.post('/addTodoItem', function (req, res) { //add Diary
    db.collection('todolist').insertOne({
        todoID: req.body.id,
        date: req.body.date,
        title: req.body.title,
        content: req.body.content,
        check:  req.body.check,
        selected:  req.body.selected,
    }, function (err, res) {
        console.log('[server] todoItem  : 저장완료')

    })

})
app.post('/updateTodoItem', function (req, res) { //add Diary
    db.collection('todolist').updateOne(
        { todoID: req.body.todoID }, 
        {
            $set:
            {
                title: req.body.title,
                content: req.body.content,
            }
        }, 
        function (err, res) {
            if (err) {
                console.log("Update failed");
            } else {
                console.log('[server] todoItem  : 수정완료')
            }
        }
    );

})

app.post('/updateTodoItemCheck', function (req, res) { //add Diary
    db.collection('todolist').updateOne(
        { todoID: req.body.todoID }, 
        {
            $set:
            {
                check: req.body.check,
            }
        }, 
        function (err, res) {
            if (err) {
                console.log("Update failed");
            } else {
                console.log('[server] todoItem  : 수정완료')
            }
        }
    );

})
app.delete('/deleteTodoItem', function (req, response) {
    let id = req.body.id;
    console.log(id);
    db.collection('todolist').deleteOne({todoID:id} , function (err, result) {
        if (err) {
            console.log(err);
            response.status(500).send('Database Error');
        } else if (result.deletedCount === 0) {
            console.log('No document matched the query. Deleted 0 documents.');
            response.status(404).send('Document not found');
        } else {
            console.log('삭제완료');
            response.status(200).send('삭제완료');
        }
    });
});

