angular.module('App')
    .controller("loginCtrl", function ($scope, $location, student_info, $rootScope) {
        $scope.a=function(){
            $location.url('/login');
        };
        $scope.teacher = {
            isAdmin: true,
            name: "admin",
            pass: 123
        };
        $scope.teacherLogin = function (admin) {
            if (admin.name == $scope.teacher.name && admin.pass == $scope.teacher.pass) {
                $rootScope.Currentuser = $scope.teacher;
                $location.url('/admin');
            }
            else {
                alert("Wrong");
            }
        };
        $scope.studentLogin = function (student) {
            var currentStudent = student_info.filter(function (stu) {
                return student.name == stu.name && student.pass == stu.pass
            })[0];
            if (currentStudent) {
                $rootScope.Currentuser = currentStudent;
                $location.url('/student');
            } else {
                alert("wrong");
            }
            /*for(i=0;i<student_info.length;i++)
             {
             if (student.name == student_info[i].name && student.pass == student_info[i].pass) {
             $rootScope.Currentuser = student_info[i];
             $location.url('/student');
             break;
             }
             }*/
        };

    })
    .controller("adminCtrl", function ($scope, $location, student_info, Main, $rootScope) {
        Main.isAdmin();
        $scope.logout = Main.logout;
        $scope.stuData = {
            name: "usama",
            pass: "i",
            tasks: []
        };
        $scope.viewTask = function (user) {
            $rootScope.tmpUser = user;
            $location.path('/task')
        };
        $scope.info = student_info;
        $scope.addStudent = function (stuData) {
            student_info.push($scope.stuData);
            Main.saveData();
            $scope.stuData = {
                name: "", pass: "", tasks: [],picture:"",fullname:""
            };
        };
        $scope.delete = function (index) {
            student_info.splice(index, 1);
            Main.saveData();
        };
        $scope.giveTask = function (index) {
            var given_task = prompt("Give Task");
            console.log("index:" + index);
            if (given_task) {
                student_info[index].tasks.push({
                    name: given_task,
                    comments: [],
                    ratings: '',
                    status: true
                });
                Main.saveData();
            }
        };
    })
    .controller("taskCtrl", function ($scope, student_info, $rootScope, Main, $location) {
        !$rootScope.tmpUser && $location.path('/admin');
        $scope.comment = {};
        $scope.Addcomment = function (index, comment) {
            comment.msg && $rootScope.tmpUser.tasks[index].comments.push({comment: comment.msg, type: 'admin'});
            Main.saveData();
            $scope.comment.msg = '';
        };
        $scope.saveData = function () {
            Main.saveData();
        };
        $scope.ratingArr = [
            '*',
            '**',
            '***',
            '****',
            '*****'
        ];
        $scope.back = function () {
            $rootScope.tmpUser = undefined;
            $location.path('/admin');
        };
    })
    .controller("studentCtrl", function ($scope, Main, student_info, $rootScope,$location) {
        Main.isStudent();
        $scope.logout = Main.logout;
        $scope.comment = {};
        $scope.resetData = function () {
            $scope.stuData = angular.extend({}, $rootScope.Currentuser);
        };
        $scope.resetData();
        $scope.updateStudent = function () {
            angular.extend($rootScope.Currentuser, $scope.stuData);
            Main.saveData();
        };
        $scope.isDisabled = function () {
            var result;
            result = $rootScope.Currentuser.fullname == $scope.stuData.fullname && $rootScope.Currentuser.picture == $scope.stuData.picture
            return result
        };
        $scope.takePicture=function(files){
            var f = new FileReader();
            f.onload = function(){
                $scope.stuData.picture= f.result;
                $scope.$$phase || $scope.$digest();
            };
            f.readAsDataURL(files[0])
        };

        var video, canvas, ctx, localMediaStream;
        $scope.initCamera = function() {
            video = document.querySelector('video');
            canvas = document.querySelector('canvas');
            ctx = canvas.getContext('2d');
            localMediaStream = null;
            video.onloadeddata = function () {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            };
        };

        $scope.snapshot=function() {
            if (localMediaStream) {
                ctx.drawImage(video, 0, 0);
                // "image/webp" works in Chrome.
                // Other browsers will fall back to image/png.
                $scope.stuData.picture= canvas.toDataURL();
                $scope.stopCamera();
               $scope.$$phase || $scope.$digest();
            }
        };

        $scope.startCamera=function() {
                navigator.getUserMedia  = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
            navigator.getUserMedia({video: true}, function (stream) {
                video.src = window.URL.createObjectURL(stream);
                localMediaStream = stream;
                $scope.isCamera = true;
                $scope.$$phase || $scope.$digest();
            }, console.log.bind(console, "getUserMediaError: "));
        };

        $scope.stopCamera=function() {
            $scope.isCamera = false;
            video.pause();
            localMediaStream.stop();
        };






        $scope.Addcomment = function (index, comment) {
            comment.msg && $rootScope.Currentuser.tasks[index].comments.push({comment: comment.msg, type: 'user'});
            Main.saveData();
            /*$scope.comments="";*/
            $scope.comment.msg = '';
        };
        $scope.ProfileEdit=function(){
            $location.url('/ProfileEdit');
        }

    });