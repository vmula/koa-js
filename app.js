const koa = require('koa');
const koaRouter = require('koa-router');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const path = require('path');

const app = new koa();
const router = new koaRouter();

const students = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
];

app.use(bodyParser());
app.use(router.routes())
    .use(router.allowedMethods());

render(app, {
    root: path.join(__dirname, 'templates/views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false,
});

router.get('/', index);
router.get('/add', addStudent);
router.post('/add', add);

async function index(ctx) {
    await ctx.render('index', {
        title: 'My Students',
        students: students,
    });
};

async function addStudent(ctx) {
    await ctx.render('addStudent', {
        title: 'Add A Student',
    });
};

async function add(ctx) {
    const body = ctx.request.body;
    students.push({ 
        first: body.firstName, 
        last: body.lastName, 
        year: body.dob, 
        passed: body.yop 
    });
    ctx.redirect('/');
}


app.listen(3000, () => console.log('Server started...'));


