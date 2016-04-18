angular.module('App')
    .factory("student_info", function ($localStorage) {
        return $localStorage.get('student_info') || [];
    })
    .service("$localStorage", function ($window) {
        var self = this;
        this.get = function (key) {
            var value = $window.localStorage[key];
            try {
                value = JSON.parse(value);
            } catch (e) {
            }
            return value;
        };
        this.set = function (key, value) {
            var type = typeof value;
            if (type == "object") value = JSON.stringify(value);
            $window.localStorage[key] = value;
            return self;
        };
        this.del = function (key) {
            delete $window.localStorage[key];
            return self;
        };
    })
    .service("Main", function ($rootScope, $location, $localStorage, student_info) {
        this.isAdmin = function () {
            (!$rootScope.Currentuser || !$rootScope.Currentuser.isAdmin) && $location.url('/');
        };
        this.isStudent = function () {
            (!$rootScope.Currentuser || $rootScope.Currentuser.isAdmin) && $location.url('/');
        };
        this.logout = function () {
            $rootScope.Currentuser = undefined;
            $location.url('/');
        };
        this.saveData=function(){
            $localStorage.set('student_info', student_info);
        };
    })

;