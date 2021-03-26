app.controller('brandController' ,function($scope,$controller,brandService){
    $controller("baseController",{$scope:$scope});
    //全部元素
    // $scope.findAll=function (){
    //     brandService.findAll().success(
    //         function (response){
    //             $scope.list = response;
    //         })
    // }
    //分页
    $scope.findPage=function (page,rows){
        brandService.findPage(page,rows).success(
            function (response){
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;
            })
    }

    //添加品牌
    $scope.save=function (){
        var object = null;
        if ($scope.entity.id!=null) {
            object = brandService.update($scope.entity)
        }else {
            object = brandService.add($scope.entity);
        }
        object.success(
            function (response){
                if (response.success){
                    $scope.reloadList();
                }else {
                    alert($scope.message);
                }
            });


    }

    $scope.findOne=function (id){
        brandService.findOne(id).success(
            function (response){
                $scope.entity=response;
            })
    }


    $scope.dele = function (){
        brandService.dele($scope.selectIds).success(
            function (response){
                if (response.success){
                    $scope.reloadList();
                    $scope.selectIds=[];
                }else {
                    alert(response.message);
                }
            }
        )
    }

    $scope.search =function (page,rows){
        brandService.search(page, rows,$scope.searchEntity).success(
            function (response){
                $scope.paginationConf.totalItems=response.total;
                $scope.list=response.rows;
            }
        )
    }

});