// 图书列表渲染
var bookListHome = new Vue({
    el:'#search-book-list',
    data:{
        booklist:[
            {
                id: '1',
                cover: '../src/img/b1.png',
                title: "青鸟",
                short: '当孩子想知道幸福是什么，不妨听听《青鸟》的答案。',
                type: '儿童文学',
                playtimes: '2309',
                publishdate: '2019-03-06',
                grade: '1~3',
                url:'book.html'
            }, {
                id: '1',
                cover: '../src/img/b1.png',
                title: "青鸟",
                short: '当孩子想知道幸福是什么，不妨听听《青鸟》的答案。',
                type: '儿童文学',
                playtimes: '2309',
                publishdate: '2019-03-06',
                grade: '1~3',
                url:'book.html'
            },
        ]
    }
})