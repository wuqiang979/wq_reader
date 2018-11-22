<template>
  <div class="content1">
    <div id="iframe_box1">
      <iframe id="my_iframe" name="iframe" src="" frameborder="0" scroll='no' marginwidth="0" marginheight="0" :style="{'height': (height - 4) + 'px'}"></iframe>
    </div>
    <button class='btn prev' @click="prev">上一章</button>
    <button class='btn next' @click="next">下一章</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      pageNum: 0,
      pageIndex: 0,
      htmlArr: [
        "/static/html/chapter1.html",
        "/static/html/chapter2.html",
        "/static/html/chapter3.html",
        "/static/html/chapter4.html",
        "/static/html/chapter5.html",
        "/static/html/chapter6.html",
        "/static/html/chapter7.html",
        "/static/html/chapter8.html",
        "/static/html/chapter9.html",
        "/static/html/chapter10.html",
        "/static/html/chapter11.html",
        "/static/html/chapter12.html",
        "/static/html/chapter13.html",
        "/static/html/chapter14.html",
        "/static/html/chapter15.html",
        "/static/html/chapter16.html",
        "/static/html/chapter17.html",
        "/static/html/chapter18.html",
      ],
      htmlIndex: 0,
      height: window.innerHeight,
    };
  },
  mounted() {
    // alert(this.height);
    this.getHtml(this.htmlArr[this.htmlIndex]);
  },
  methods: {
    getHtml(url) {
      let htmlUrl = url;
      let iframe = document.getElementById("my_iframe");
      let ifrContentWindow = iframe.contentWindow;
      iframe.setAttribute("src", htmlUrl);
      if (iframe.attachEvent){ 
        iframe.attachEvent("onload", function(){ 
          ifrContentWindow.document.body.style.margin = '0px'
        }); 
      } else { 
        iframe.onload = ()=>{
          ifrContentWindow.document.body.style.margin = '0px';
          ifrContentWindow.document.body.style.margin = '0px';
          ifrContentWindow.document.body.style.padding = '0px';
          ifrContentWindow.document.body.style.fontSize = '1.2rem';
          ifrContentWindow.document.body.style.lineHeight = '1.5';
          ifrContentWindow.document.body.style.height = (window.innerHeight) + 'px';
          ifrContentWindow.document.body.style.columnWidth = window.innerWidth+'px';
          ifrContentWindow.document.body.style.columnFill = 'auto';
          ifrContentWindow.document.body.style.columnGap = '0';
          // ifrContentWindow.document.body.style.overflow = 'hidden'
          ifrContentWindow.document.body.style.touchAction = 'none'
          this.pageNum = Math.ceil(ifrContentWindow.document.body.scrollWidth/window.innerWidth);
        }
      }; 
    },
    next(){
      let ifrContentWindow = document.getElementById("my_iframe").contentWindow;
      let iframeBody = ifrContentWindow.document.body;
      if(this.pageNum>this.pageIndex+1){
        this.pageIndex++;
        iframeBody.style.WebkitTransform="translate("+(-this.pageIndex*window.innerWidth)+"px)";
      }else{
        console.log('这是最后一页了');
        if(this.htmlIndex<this.htmlArr.length-1){
          this.htmlIndex++;
          this.getHtml(this.htmlArr[this.htmlIndex]);
        }else{
          alert('这是最后一章了哦')
        }
      }
    },
    prev(){
      let ifrContentWindow = document.getElementById("my_iframe").contentWindow;
      let iframeBody = ifrContentWindow.document.body;
      if(this.pageIndex>0){
        this.pageIndex--;
        iframeBody.style.WebkitTransform="translate("+this.pageIndex*window.innerWidth+"px)";
        console.log(this.pageNum);
      }else{
        console.log('这是第一页了');
        if(this.htmlIndex>0){
          this.htmlIndex--;
          this.getHtml(this.htmlArr[this.htmlIndex]);
        }else{
          alert('这是第一章了哦')
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content,.iframe_box{
  width: 100%;
  height: 100%;
}
#my_iframe {
  border: none;
  width: 100%;
}
.btn{
  position: fixed;
  top: 50%;
  margin-top: -10px;
}
.prev{
  left: 20px;
}
.next{
  right: 20px;
}
</style>
