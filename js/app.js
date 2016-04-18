angular.module("App", ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'component/start_up.html'
            })
            .when('/signup', {
                templateUrl: 'component/signup.html'
            })
            .when('/login', {
                templateUrl: 'component/login.html',
                controller: 'loginCtrl'
            })
            .when('/admin', {
                templateUrl: 'component/admin.html',
                controller: 'adminCtrl'
            })
            .when('/student', {
                templateUrl: 'component/student.html',
                controller: 'studentCtrl'
            })
            .when('/task', {
                templateUrl: 'component/task.html',
                controller: 'taskCtrl'
            })
            .when('/ProfileEdit', {
                templateUrl: 'component/ProfileEdit.html',
                controller: 'studentCtrl'
            })

    });




