const scroll = {
  isEnd:false,
  start(callback){
    console.log('start');
    let timer = null;
    callback && window.addEventListener('scroll',()=>{
      if(timer){
        clearTimeout(timer);
      }
      //函数防抖
      timer = setTimeout(()=>{
        //浏览器向上滚动的高度
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //文档的真实高度
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        //浏览器窗口的可视高度
        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if(!this.isEnd && scrollTop + clientHeight == scrollHeight){
          window.scrollTo(0,scrollTop - 100);
          //请求数据
          callback();
        }
      },300)
    })
  },
  end(){
    this.isEnd = true;
  }
}
export default scroll