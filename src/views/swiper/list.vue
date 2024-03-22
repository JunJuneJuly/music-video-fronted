<template>
  <div>
    <div class="filter-container">
      <el-upload
        class="upload-demo"
        action="http://localhost:3000/swiperlist/upload"
        :on-success="uploadSuccess"
        :show-file-list="false">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-table :data="swiperlist" lazy v-loading="loading">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.img_url" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteBtn(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getSwiperlist,deleteSwiper } from '@/api/swiper.js'
  export default{
    name:'Swiper',
    data(){
      return{
        swiperlist:[],
        loading:false,
      }
    },
    mounted(){
      this.getTable()
    },
    methods:{
      uploadSuccess(res){
        if (res.id_list.length > 0){
          this.$message.success('上传成功')
          this.getTable()
        }
      },
      async getTable(){
        let res = await getSwiperlist()
        if(res.code == 200){
          this.swiperlist = res.data;
        }
      },
      deleteBtn(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async()=>{
          let res = await deleteSwiper({
            id:row._id
          })
          if(res.code == 200){
            this.$message.success('删除成功');
            this.getTable()
          }
        }).catch(()=>{
          this.$message.info('已取消删除')
        })
      },
    }
  }
</script>