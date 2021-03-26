package com.pinyougou.sellergoods.service;

import com.pinyougou.pojo.TbBrand;
import entity.PageResult;

import java.util.List;
import java.util.Map;

/**
 *
 */

public interface BrandService {
    /**
    *   查询页表
    */
    public List<TbBrand> findAll();
    /**
     *  返回分页表
     */
    public PageResult findPage(int pageNum,int pageSize);
    /**
     *  添加新品
     */
    public void add(TbBrand brand);
    /**
     *  查数据
     */
    public TbBrand findOne(Long id);
    /**
        改数据
     */
    public void update(TbBrand brand);
    /**
     *  删除
     */
    public void delete(Long[] ids);
    /**
     * 条件查询
     */
    public PageResult findPage(TbBrand brand,int pageNum,int pageSize);

    public List<Map> selectOptionList();
}
