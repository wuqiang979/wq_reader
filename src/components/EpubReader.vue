<template>
  <div id="epub_reader_wrap" :style="{'height': (height - 20) + 'px'}">
    <div class='epub-content-box' id="epub_content_box"
      @touchstart='touchStart'
      @touchmove='touchMove'
      @touchend='touchEnd'
      @click='myTap'></div>
    <div id='zxjq_mask'
      @touchstart='touchStart'
      @touchmove='touchMove'
      @touchend='touchEnd'
      @click='myTap'></div>
    <div class='mulu' v-if="showMulu" @click.self="showMulu=false">
      <ul>
        <li v-for="(item,index) in dealwithArr" :key='index' @click="clickMulu(item)">{{item.Title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Epub",
  data() {
    return {
      height: window.innerHeight,
      pageNum: 0, // 当前资源总页数
      pageIndex: 0,// 当前资源索引
      currentUlrIndex: 0, // 当前url索引
      splitFileUrls: [],
      rootUrl: 'http://aqrv2.kingchannels.cn/files/encrypted/dcd/5c38d8db206149349f00d5d7df16fe95_0_40767_encrypted_epub/OPS/',
      ebookMemu: [],
      dealwithArr: [],
      showMulu: false
    };
  },
  mounted() {
    // document.addEventListener('touchmove', function (event) {
    //     event.preventDefault();
    // }, {
    //     passive: false
    // });
    this.authorzie();
    this.getList();
  },
  methods: {
    // 点击目录
    clickMulu(item){
      if(!item.flag){
        let arr = item.Url.split('#');
        for (let i = 0; i < this.splitFileUrls.length; i++) {
          if(this.splitFileUrls[i].indexOf(arr[0])!==-1){
            console.log(arr)
            this.currentUlrIndex = i;
            if(arr.length>1){
              this.hashId = arr[1]
            }else{
              this.hashId = ''
            }
            this.zxjq_xhl(this.splitFileUrls[this.currentUlrIndex]);
            this.showMulu = false;
            return false;
          }
        }
      }else{
        alert('上锁内容');
      }
    },
    // 授权
    authorzie(){
      this.$http.post('http://develop.kingchannels.cn:50000/aqr/authorize', {
        authorzieParameters: JSON.stringify({
          contentexternalid: 'A00001-01-978-7-122-18479-5-Epub',
          // contentexternalid: 'A00001-01-978-7-121-32805-3-Epub',
          device: {
            devicekey: '24,c<3(A9bySX~F)',
            DeviceType: 4,
            Title: "电脑试读"
          },
          FromSalePlatformTitle: "可知",
          userinfo: {
            nickname: "未登录",
            ExternalId: "未登录"
          },
          organizationExternalId: null,
          IsOnline: true
        }),
        random: 0.9164750294214394
      }).then(res=>{
        this.splitFileUrls = res.data.Data.SplitFileUrls;
        this.pageNum = res.data.Data.SplitFileUrls.length;
        this.Key = res.data.Data.Key
        this.zxjq_xhl(this.splitFileUrls[0]);
      })
    },
    getList(){
      this.$http.get('http://develop.bridge.kingchannels.cn/transfer/v1/api/tableofcontent/list',{
        params: {
          objectId: 1792050,
          isRecursive: true,
          authorzieParameters: JSON.stringify({
            contentexternalid: 'A00001-01-978-7-121-32805-3-Epub',
            device: {
              devicekey: '24,c<3(A9bySX~F)',
              DeviceType: 4,
              Title: "电脑试读"
            },
            FromSalePlatformTitle: "可知",
            userinfo: {
              nickname: "未登录",
              ExternalId: "未登录"
            },
            organizationExternalId: null,
            IsOnline: true
          })
        }
      }).then((res)=>{
        try {
          let tableofcontentList = res.data.Data.ItemList;
          // 处理目录结构为线性结构
          let tableofcontent1 = [];
          this.dealwithMulu(tableofcontentList);
        } catch (error) {
          console.log(error.message)
        }
      })
    },
    // 递归处理目录
    dealwithMulu(arr){
      for(let i=0;i<arr.length;i++){
        this.dealwithArr.push({
          IsLock: arr[i].IsLock,
          Title: arr[i].Title,
          Url: arr[i].Url
        })
        if(arr[i].Childs.length>0){
          this.dealwithMulu(arr[i].Childs);
        }
      }
    },
    // 获取文件流
    zxjq_xhl(url,flag=true){
      var _this = this;
      var xhr = new XMLHttpRequest();
      xhr.responseType = "arraybuffer";
      xhr.open("GET", url, true);
      xhr.send();
      xhr.onload = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            _this.dealData(xhr.response,flag);
          } else {
            console.log('请求失败。。。')
          }
        }
      };
    },
    // 解密流文件
    dealData(arrayBuffer,flag){
      var myUint8Array = new Uint8Array(arrayBuffer);
      // ----------------
      let Uint8ToBase64 = function (u8Arr) {
        var CHUNK_SIZE = 0x8000; //arbitrary number
        var index = 0;
        var length = u8Arr.length;
        var result = "";
        var slice;
        while (index < length) {
          slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
          result += String.fromCharCode.apply(null, slice);
          index += CHUNK_SIZE;
        }
        return btoa(result);
      };
      var word = Uint8ToBase64(myUint8Array);                
      var key = CryptoJS.enc.Utf8.parse(this.makeKey('24,c<3(A9bySX~F)',this.Key));
      // 解密流得到 wordarray
      var decryptedData = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      this.getHtml(decryptedData,flag)
    },
    // 加载内容并计算分屏
    getHtml(wordArray,flag) {
      // 处理静态资源路径
      let xmlContent = CryptoJS.enc.Utf8.stringify(wordArray)
      xmlContent = xmlContent.substring(xmlContent.indexOf('<body>')+6,xmlContent.indexOf('</body>'))
      xmlContent = xmlContent.replace(/src="/g, 'src="' + this.rootUrl);
      xmlContent = xmlContent.replace(/href="/g, 'href="' + this.rootUrl);
      // 给图片加默认图片，并设置图片的最大高度为窗口高度-40
      // xmlContent = xmlContent.replace(/<img([^>]+)src=\"[/]?([^"]+)\"([^>]*)>|<( *)img( *)[/>|>]/gi, '<img data-src=\"$2?width=300&quality=100&mode=min\" $1src="/static/images/book-open.svg" $3 style=\"max-height:'+(window.innerHeight - 40)+'px\">')
      xmlContent = xmlContent.replace(/<img([^>]+)src=\"[/]?([^"]+)\"([^>]*)>|<( *)img( *)[/>|>]/gi, '<img $1src="$2?width=400&quality=100&mode=min" $3 style=\"max-height:'+(window.innerHeight - 40)+'px\">')
      // 加载body计算分屏
      document.querySelector('#epub_content_box').innerHTML = xmlContent;
      document.querySelector('#epub_reader_wrap').style.columnWidth = window.innerWidth + 'px';
      this.$nextTick(()=>{
        let imgDoms = document.querySelectorAll('img');
        let imgLoaded = 0;
        if(imgDoms.length>0){
          for(let i=0;i<imgDoms.length;i++){
            // imgDoms[i].src = imgDoms[i].getAttribute('data-src');
            imgDoms[i].onload = ()=>{
              imgLoaded++;
              if(imgLoaded == imgDoms.length){
                console.log('相等');
                let iframeboxW = document.querySelector('#epub_reader_wrap').scrollWidth;
                let windowH = window.innerWidth;
                let pages = iframeboxW/windowH;
                this.pageNum = pages;
                if(!flag){
                  this.pageIndex = this.pageNum-1;
                  document.getElementById("epub_content_box").style.WebkitTransform="translateY("+(-this.pageIndex*(window.innerHeight-20))+"px)";
                }else{
                  if(this.hashId){
                    let countPageIndex = parseInt(document.getElementById(this.hashId).offsetTop/(window.innerHeight-20));
                    if(this.toUrlTimer){
                      clearInterval(this.toUrlTimer)
                      this.toUrl = ''
                    }
                    let countTime = 1
                    this.toUrlTimer = setInterval(() => {
                      this.pageIndex = parseInt(document.getElementById(this.hashId).offsetTop/(window.innerHeight-20));
                      if(this.pageIndex == countPageIndex){
                        document.getElementById("epub_content_box").style.WebkitTransform="translateY("+(-this.pageIndex*(window.innerHeight-20))+"px)";
                        clearInterval(this.toUrlTimer);
                        this.toUrl = ''
                      }else{
                        countPageIndex = this.pageIndex;
                      }
                    }, 100);
                  }else{
                    this.pageIndex = 0;
                    document.getElementById("epub_content_box").style.WebkitTransform="translateY("+(-this.pageIndex*(window.innerHeight-20))+"px)";
                  }
                }
              }
            }
          }
        }else{
          let iframeboxW = document.querySelector('#epub_reader_wrap').scrollWidth;
          let windowH = window.innerWidth;
          let pages = iframeboxW/windowH;
          this.pageNum = pages;
          if(!flag){
            this.pageIndex = this.pageNum-1;
            document.getElementById("epub_content_box").style.WebkitTransform="translateY("+(-this.pageIndex*(window.innerHeight-20))+"px)";
          }else{
            if(this.hashId){
              let countPageIndex = parseInt(document.getElementById(this.hashId).offsetTop/(window.innerHeight-20));
              if(this.toUrlTimer){
                clearInterval(this.toUrlTimer)
                this.toUrl = ''
              }
              let countTime = 1
              this.toUrlTimer = setInterval(() => {
                this.pageIndex = parseInt(document.getElementById(this.hashId).offsetTop/(window.innerHeight-20));
                if(this.pageIndex == countPageIndex){
                  document.getElementById("epub_content_box").style.WebkitTransform="translateY("+(-this.pageIndex*(window.innerHeight-20))+"px)";
                  clearInterval(this.toUrlTimer);
                  this.toUrl = ''
                }else{
                  countPageIndex = this.pageIndex;
                }
              }, 100);
            }else{
              this.pageIndex = 0;
              document.getElementById("epub_content_box").style.WebkitTransform="translateY("+(-this.pageIndex*(window.innerHeight-20))+"px)";
            }
          }
        }
      })
    },
    // 解密密钥
    makeKey(devicekey, wordText) {
      //解密文本方法
      devicekey = devicekey;
      var key = CryptoJS.enc.Utf8.parse(devicekey);
      var decryptedData = CryptoJS.AES.decrypt(wordText, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return CryptoJS.enc.Utf8.stringify(decryptedData);
    },
    // 点击屏幕事件
    myTap(e){
      e.preventDefault();
      let touchDom = e.clientX;
      if(e.clientX>0 && e.clientX<window.innerWidth*0.3){
        this.prev();
      }else if(e.clientX>0 && e.clientX>window.innerWidth*0.7){
        this.next();
      }else{
        this.showMulu = true;
      }
    },
    // touch事件开始
    touchStart(e){
      let touchDom = e.changedTouches[0];
      this.startClientX = touchDom.clientX;
      this.startTimeStamp = e.timeStamp;
    },
    // touch移动事件
    touchMove(e){
      e.preventDefault();
      e.stopPropagation();
    },
    // touch移动结束事件
    touchEnd(e){
      // e.preventDefault();
      e.stopPropagation();
      let touchDom = e.changedTouches[0];
      this.moveX = touchDom.clientX - this.startClientX;
      this.endTimeStamp = e.timeStamp;
      if(this.moveX<-50 && this.endTimeStamp>100){
        this.next();
      }else if(this.moveX>50 && this.endTimeStamp>100){
        this.prev();
      }
    },
    // 下一页
    next(){
      this.pageNum = document.querySelector('#epub_reader_wrap').scrollWidth/window.innerWidth
      let epubContentBox = document.getElementById("epub_content_box");
      if(this.pageNum>this.pageIndex+1){
        this.pageIndex++;
        epubContentBox.style.WebkitTransform="translateY("+(-this.pageIndex*(window.innerHeight-20))+"px)";
      }else{
        if(this.currentUlrIndex+1<this.splitFileUrls.length){
          epubContentBox.style.WebkitTransform="translateY(0px)";
          this.pageIndex = 0;
          this.currentUlrIndex++;
          this.zxjq_xhl(this.splitFileUrls[this.currentUlrIndex]);
        }else{
          alert('最后一章');
        }
      }
    },
    // 上一页
    prev(){
      let epubContentBox = document.getElementById("epub_content_box");
      if(this.pageIndex>0){
        this.pageIndex--;
        epubContentBox.style.WebkitTransform="translateY("+ (-this.pageIndex*(window.innerHeight-20))+"px)";
      }else{
        this.currentUlrIndex--;
        if(this.currentUlrIndex>=0){
          this.zxjq_xhl(this.splitFileUrls[this.currentUlrIndex],false);
        }
      }
    },
    // 章节跳转
    toUrl(url){
      let arr = url.split('#');
      for (let i = 0; i < this.splitFileUrls.length; i++) {
        if(this.splitFileUrls[i].indexOf(arr[0])){
          this.currentUlrIndex = i;
          this.zxjq_xhl(this.splitFileUrls[this.currentUlrIndex]);
          this.showMulu = false;
          return false;
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  img {
    max-width: 100%;
    height: auto!important;
    margin: 0 auto!important;
    display: inherit;
  }
  #epub_reader_wrap{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px 0;
    column-gap: 0;
    column-fill: auto;
    touch-action: none;
    overflow: visible;
    overflow: hidden;
    #zxjq_mask{
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 9;
    }
  }
  .epub-content-box{
    touch-action: none;
    text-indent: 2rem;
    line-height: 2;
    padding: 10px;
    position: relative;
    z-index: 10;
  }
  .btn{
    position: absolute;
    top: 50%;
    right: 20px;
  }
  .btn.prev{
    left: 20px;
    right: auto;
  }

  // 目录
  .mulu {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
    background: rgba(10,10,10,0.5);
    ul{
      width: 70%;
      height: 100%;
      overflow: scroll;
      background: #ccc;
      li{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 10px;
        border-bottom: 1px solid #999;
      }
      li:last-child{
        border-bottom: none;
      }
    }
  }
</style>
