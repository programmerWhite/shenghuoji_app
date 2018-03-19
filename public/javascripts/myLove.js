/**
 * Created by yun on 2018/3/19.
 */

app.controller("myLoveController", function ($scope) {

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
                loveText:"我的好老婆。"
            }
        ]
    };
    dealLoveDate($scope,data);

    $scope.talkLove = function (){

    }
});

function dealLoveDate($scope,data){
    $scope.dateData = data.dateData;
}