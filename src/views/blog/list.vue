<template>
  <div>
    <el-table v-loading="loading" :data="blogList" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="nickname" label="发布人"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {getBloglist,deleteBlogItem} from '@/api/blog.js';
import scroll from '@/utils/scroll.js';
export default{
  data(){
    return {
      blogList: [],
      loading: false,
      count:10
    }
  },
  mounted(){
    this.getTable();
  },
  methods:{ 
    async getTable(){
      this.loading = true;
      let res = await getBloglist({
        start:this.blogList.length,
        count:this.count
      });
      if(res.code == 200){
        for(let i=0;i<res.data.length;i++){
          this.blogList.push(JSON.parse(res.data[i]));
        }
        if(res.data.length < this.count){
          scroll.end()
        }
      }
      this.loading = false;
    },
    onDel(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async()=>{
        let res = await deleteBlogItem({
          id:row._id
        })
        if(res.code == 200){
          this.$message.success('删除成功');
          this.blogList = [];
          this.getTable()
        }
      }).catch(()=>{
        this.$message.info('已取消删除')
      })
    },
  }
}
</script>
