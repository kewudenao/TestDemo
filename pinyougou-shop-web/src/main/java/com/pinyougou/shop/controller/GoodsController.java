package com.pinyougou.shop.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbGoods;
import com.pinyougou.pojogroup.Goods;
import com.pinyougou.sellergoods.service.GoodsService;
import entity.PageResult;
import entity.Result;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * controller
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/goods")
public class GoodsController {

	@Reference
	private GoodsService goodsService;
	
	/**
	 * 返回全部列表
	 * @return
	 */
	@RequestMapping("/findAll")
	public List<TbGoods> findAll(){			
		return goodsService.findAll();
	}
	
	
	/**
	 * 返回全部列表
	 * @return
	 */
	@RequestMapping("/findPage")
	public PageResult  findPage(int page,int rows){			
		return goodsService.findPage(page, rows);
	}
	
	/**
	 * 增加
	 * @param goods
	 * @return
	 */
	@RequestMapping("/add")
	public Result add(@RequestBody Goods goods){
		String sellerId = SecurityContextHolder.getContext().getAuthentication().getName();
		goods.getGoods().setSellerId(sellerId);
		try {
			goodsService.add(goods);
			return new Result(true, "增加成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "增加失败");
		}
	}
	
	/**
	 * 修改
	 * @param goods
	 * @return
	 */
	@RequestMapping("/update")
	public Result update(@RequestBody Goods goods){
		//校验Id
		Goods goods2 = goodsService.findOne(goods.getGoods().getId());
		//当前商家id
		String sellerId = SecurityContextHolder.getContext().getAuthentication().getName();
		if (!goods2.getGoods().getSellerId().equals(sellerId)||!goods.getGoods().getSellerId().equals(sellerId)){
			return new Result(false,"操作非法");
		}
		try {
			goodsService.update(goods);
			return new Result(true, "修改成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "修改失败");
		}
	}	
	
	/**
	 * 获取实体
	 * @param id
	 * @return
	 */
	@RequestMapping("/findOne")
	public Goods findOne(Long id){
		return goodsService.findOne(id);		
	}
	
	/**
	 * 批量删除
	 * @param ids
	 * @return
	 */
	@RequestMapping("/delete")
	public Result delete(Long [] ids){
		String sellerId = SecurityContextHolder.getContext().getAuthentication().getName();
		try {
			goodsService.delete(ids,sellerId);
			return new Result(true, "删除成功"); 
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "删除失败");
		}
	}
	
		/**
	 * 查询+分页
	 * @param goods
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping("/search")
	public PageResult search(@RequestBody TbGoods goods, int page, int rows  ){
		//获取商家ID
		String sellerId = SecurityContextHolder.getContext().getAuthentication().getName();
		//添加查询条件
		goods.setSellerId(sellerId);
		return goodsService.findPage(goods, page, rows);		
	}

	@RequestMapping("/updateStatus")
	public Result updateStatus(Long[] ids,String status){
		try {
			goodsService.updateStatus(ids, status);
			return new Result(true,"成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false,"失败");
		}
	}
	@RequestMapping("/updateMarketable")
	public Result updateMarketable(Long[] ids,String marketable){
		String sellerId = SecurityContextHolder.getContext().getAuthentication().getName();
		try {
			goodsService.updateMarketable(ids,marketable,sellerId);
			return new Result(true,"上架成功");
		}catch (Exception e){
			e.printStackTrace();
			return new Result(false,"上架失败");
		}
	}
}
