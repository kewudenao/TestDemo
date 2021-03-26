 //控制层 
app.controller('itemCatController' ,function($scope,$controller,itemCatService,typeTemplateService,){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{
			serviceObject=itemCatService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.findByParentId($scope.entity.parentId);//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		itemCatService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.findByParentId($scope.entity.parentId);//刷新列表
					$scope.selectIds=[];
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索

	$scope.entity={parentId:0};

	$scope.findByParentId=function (parentId) {
		$scope.entity={parentId:parentId};
		itemCatService.findByParentId(parentId).success(
			function (response) {
				$scope.list=response;
			}
		)

	}

	$scope.breadcrumb=[{id:0,name:"顶级分类列表"}];

	$scope.search=function (id,name){
		$scope.breadcrumb.push({id:id, name:name});
		$scope.findByParentId(id);
	}

	$scope.showList=function (index,id){
		$scope.breadcrumb.splice(index+1,2);
		$scope.findByParentId(id);
	}

	$scope.typeTemplateMap=[];
	$scope.findTypeTemplateList=function (){
		typeTemplateService.findAll().success(
			function (response){
				$scope.typeTemplateList=response;

				//构建模板数据，用于列表显示名称
				for (var i=0;i<$scope.typeTemplateList.length;i++){
					var typetemplate = $scope.typeTemplateList[i];
					$scope.typeTemplateMap[typetemplate.id]=typetemplate.name;
				}
			}
		)
	}

});	
