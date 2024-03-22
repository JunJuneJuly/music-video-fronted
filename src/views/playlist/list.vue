<template>
  <div>
    <el-table :data="playlist" lazy v-loading="loading">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="封面" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="copywriter" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteBtn(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog title="修改" :visible.sync="showDialog">
        <el-form :model="playlistDetail">
          <el-form-item label="歌单名称">
            <el-input v-model="playlistDetail.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="playlistDetail.copywriter"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit">更新</el-button>
          <el-button @click="onCancel">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {getPlaylist,getByIdDetail,updatePlaylist,deletePlaylist} from '@/api/playlist.js';
import scroll from '@/utils/scroll.js';
export default {
  name:'playlist',
  data(){
    return{
      playlist: [],
      count: 10,
      loading: false,
      playlistDetail:{},
      showDialog:false
    }
  },
  created(){
    this.getTable();
  },
  mounted(){
    scroll.start(this.getTable)
  },
  methods:{
    async getTable(){
      this.loading = true;
      let res = await getPlaylist({
        start:this.playlist.length,
        count:this.count
      });
      if(res.code == 200){
        this.playlist = this.playlist.concat(res.data);
        if(res.data.length < this.count){
          scroll.end()
        }
      }
      this.loading = false;
    },
    async handleEdit(scope){
      this.showDialog = true;

      let res= await getByIdDetail({
        id:scope.row._id
      });
      if(res.code == 200){
        this.playlistDetail = JSON.parse(res.data[0]);
      }
    },
    deleteBtn(scope){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let res = await deletePlaylist({
          id:scope.row._id
        })
        if(res.code == 200){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.playlist = [];
          this.getTable();
        }
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    async onSubmit(){
      let res = await updatePlaylist(this.playlistDetail)
      if(res.code == 200){
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.playlist = [];
        this.getTable();
      }else{
        this.$message.warn('修改失败');
      }
      this.showDialog = false;
    },
    onCancel(){
      this.showDialog = false;
    }
  },
}
</script>
