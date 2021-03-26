app.controller('baseController',function($scope){
    //切换页码
    $scope.reloadList=function(){
        //切换页码
        $scope.search($scope.paginationConf.currentPage,
            $scope.paginationConf.itemsPerPage);
    }

    //分页控制
    $scope.paginationConf={
        currentPage:1,
        totalItems:10,
        itemsPerPage:10,
        perPageOptions:[10, 20, 30, 40, 50],
        onChange:function (){
            $scope.reloadList();
        }
    }

    $scope.selectIds=[];

    $scope.updateSelection=function ($event,id){
        if ($event.target.checked){
            $scope.selectIds.push(id);
        }else {
            //splice js中删除数据的方法
            var idx = $scope.selectIds.indexOf(id);
            $scope.selectIds.splice(idx,1);
        }
    }

    $scope.searchEntity  = {};//自定义搜索对象

    $scope.jsonToString=function (jsonString){
        var json = JSON.parse(jsonString);
        var value="";

        for (var i=0;i<json.length;i++){
            if (i>0){
                value+=",";
            }
            value+=json[i].text;
        }
        return value;
    }

    $scope.searchObjectByKey=function(list,key,value){
        for(var i=0;i<list.length;i++){
            if(list[i][key]== value){
                return list[i];
            }
        }
        return null;
    }

});