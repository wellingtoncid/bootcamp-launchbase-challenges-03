const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const courses = require('./data')
const { request } = require('express')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res) {
    return res.render('home')
})

server.get('/about', function (req, res) {
    const about = {
        avatar: 'assets/rocketseat-logo.png',
        cname: 'Rocketseat',
        slogan: 'Educação e tecnologia para sua carreira avançar para o próximo nível',
        description: 'Entenda como funciona as pricipais tecnologias direto ao ponto',
        languages: [
            { name: 'Javascript' },
            { name: 'NodeJs' },
            { name: 'ReactJs' },
            { name: 'React Native' }
        ],
        links: [
            { name: 'Facebook', url: 'http://fb.com/rocketseat' },
            { name: 'Instagram', url: 'http://instagram.com/rocketseat' },
            { name: 'Twitter', url: 'http://twitter.com/rocketseat' },
            { name: 'Youtube', url: 'http://youtube.com/rocketseat' }
        ]
    }
    return res.render('about', {about})
})

server.get('/courses', function (req, res) {
    return res.render('courses', { items: courses})
})

server.get('/course/:id', function (req, res) {
    const id = req.params.id

    console.log(id)

    const course = courses.find(function (course) {
        return course.id == id
    })

    console.log(courses)

    if (!course) {
        return res.render('not-found')
    }
    return res.render('course', { item: course })
})

server.use(function (req, res) {
    res.status(404).render("not-found")
})

server.listen(5000, function() {
    console.log('server is running')
})