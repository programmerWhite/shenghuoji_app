/**
 * Created by yun on 2018/3/19.
 */

app.controller("myLoveController", function ($scope,getTalkData,$compile) {

    var data = {
        dateData:[
            {
                id:1,
                date:"2018-01-01",
                photo:"/public/images/login/login_img.jpg",
                photoArray:[
                    'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1521466382&di=8f9c302ed945b39a8591e2969619eada&src=http://pic1.win4000.com/wallpaper/1/580ed3a031ea7.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521476522825&di=89e6e5167f8297bb22de460814493ada&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4a36acaf2edda3ccd53548ea0be93901203f9223.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521476522825&di=b4c19e14af0266c82bdea164db3c7cf8&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3801213fb80e7beca9004ec5252eb9389b506b38.jpg'
                ],
                loveText:"今天天气很好啊。"
            },
            {
                id:2,
                date:"2018-01-03",
                photo:"https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1521466382&di=8f9c302ed945b39a8591e2969619eada&src=http://pic1.win4000.com/wallpaper/1/580ed3a031ea7.jpg",
                photoArray:[
                    'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1521466382&di=8f9c302ed945b39a8591e2969619eada&src=http://pic1.win4000.com/wallpaper/1/580ed3a031ea7.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521476522825&di=89e6e5167f8297bb22de460814493ada&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4a36acaf2edda3ccd53548ea0be93901203f9223.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521476522825&di=b4c19e14af0266c82bdea164db3c7cf8&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3801213fb80e7beca9004ec5252eb9389b506b38.jpg',
                    'http://img.taopic.com/uploads/allimg/121019/234917-121019231h258.jpg'
                ],
                loveText:"我的好日子。"
            }
        ]
    };

    dealLoveDate($scope,data);

    $scope.talkLove = function (id,type){
        if(!!$scope['myLoveTalk'+id] && type != 1){
            $scope['myLoveTalk'+id] = false;
        }else{
            $scope['myLoveTalk'+id] = true;

            getTalkData.getTalk().then(function (data) {
                var htmlString = "<div>" +
                        "<span class='talk-name-text'>liuliu:</span>" +
                        "<span class='talk-text-content'>好漂亮的图片</span>" +
                    "</div>" +
                    "<div>" +
                        "<span class='talk-name-text'>uuy:</span>" +
                        "<span class='talk-name-text'>我也觉得</span>" +
                    "</div>" +
                    "<div class='submit-talk-button-container'>" +
                        "<textarea class='text-area-dom' ng-model='textAreaText'></textarea>" +
                        "<div class='submit-talk-button' ng-click='sendTalk("+id+")'>提交</div>" +
                    "</div>";

                var template = angular.element(htmlString);
                var mobileDialogElement = $compile(template)($scope);
                angular.element(document.getElementById("myLoveTalkContainer"+id)).html("");
                angular.element(document.getElementById("myLoveTalkContainer"+id)).append(mobileDialogElement);

            });
        }
    };

    $scope.previewImg = function(key,imgArray){
        $scope.preImgShow = true;

        var htmlString = "<div class='preview-img-shade-div' ng-click='changePreviewShow()' ng-show='preImgShow'>" +
                "<span class='close-preview-img-span' ng-click='changePreviewShow()'>X</span>"+
                "<img class='preview-img-dom' ng-click='clickPreviewImg($event)' src='"+imgArray[key]+"'>" +
            "</div>";

        var template = angular.element(htmlString);
        var mobileDialogElement = $compile(template)($scope);
        angular.element(document.getElementsByClassName('preview-img-shade-div')).remove();
        angular.element(document.body).append(mobileDialogElement);
    };

    $scope.sendTalk = function (id) {
        console.log("发送数据");
        $scope.talkLove(id,1);
    };

    $scope.changePreviewShow = function(){
        $scope.preImgShow = false;
    };

    $scope.clickPreviewImg = function($event){
        $event.stopPropagation();
        return false;
    };
});

app.factory('getTalkData', function ($http,$q) {
    var servers = {};

    servers.getTalk = function(){
        var q = $q.defer();
        $http({
            method:'post',
            url:"http://192.168.128.204:8882/common/common!findDialog.action",
            data:{"dialogStr":"login*"}
        }).success(function (data) {
            q.resolve(data);
        });
        return q.promise;
    };

    return servers;
});

function dealLoveDate($scope,data){
    $scope.dateData = data.dateData;
}