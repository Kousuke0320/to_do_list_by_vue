(function() {
    'use strict';

    var vm = new Vue({
        el : '#app',
        data: {
            newItem: '',
            /*todos: [{
                title: 'task1',
                isDone: false
            },{
                title: 'task2',
                isDone: false
            },{
                title: 'task3',
                isDone: false
            }]*/
            todos: []
        },
        watch: {
            todos: {
                handler: function(){
                    localStorage.setItem('todos',JSON.stringify(this.todos));
                },
                deep: true //deep option todoに何かあれば実行
            }
        },
        mounted: function() {
            this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        },
        methods: {
            addItem: function() {
                var item = {
                    title: this.newItem,
                    isDone: false//完了していないので初期値はfalse
                };
                //データ内のデータにはthisでアクセスできる
                //todosに新しいアイテムを追加する
                this.todos.push(item);
                //push後インプットの中身をからにする
                this.newItem = '';
            },
            deleteItem: function(index) {
                if(confirm('are you sure?')) {
                    //指定された部分を１つ削除する
                    this.todos.splice(index, 1);   
                }
            },
            purge: function() {
                if(!confirm('are you sure?')) {
                    return; 
                }
                this.todos = this.remaining;//残りのtodoは完了していないもの
            }
        },
        computed: {
            remaining: function() {
                /*var items = this.todos.filter(function(todo){
                    return !todo.isDone; //完了していないタスク
                });
                return items.length;*/
                return this.todos.filter(function(todo){
                    return !todo.isDone;//完了していないタスク
                })
            }
        }
    });
  })();