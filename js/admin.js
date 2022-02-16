import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js'; 
import pagination from './pagination.js'
import productsModal from './productsModal.js'
import delProductsModal from './delProductsModal.js'

const products =[];

const app = createApp({
  components:{
    pagination,
    productsModal,
    delProductsModal
  },
  data(){
    return{
      temp:{
        imagesUrl:[],
      },
      products: [],
      isNew: true,
      pagination:{},
      productModal:{},
      delProductModal:{}
    }
  },
methods:{
  // 參數query : /?page=${page}
  getProducts(page=1){ //參數預設值
    axios.get(`${url}/api/${path}/admin/products/?page=${page}`)
      .then((res)=>{
        this.products = res.data.products;
        this.pagination = res.data.pagination;
      }).catch((error)=>{
        alert(error.data.message) 
       })  
  },

  checkLogin(){
    // 取得 Token（Token 僅需要設定一次）
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)zyToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // header的夾帶
    axios.defaults.headers.common['Authorization'] = token;

    axios.post(`${url}/api/user/check`)
    .then((res)=>{
      this.getProducts();
      // alert(`確認登入!`)     
    }).catch((error)=>{
      alert(`確認登入失敗!`)
      //轉址到登入頁
      window.location = 'login.html';
    })
  },
  
  openModal(status,product){
    if(status === 'isNew'){
      this.temp={
        imagesUrl:[],
      }
      this.productModal.show();
      this.isNew = true;
    }else if(status === 'edit'){
      // 深拷貝
      this.temp = JSON.parse(JSON.stringify(product)); 
      //如果 this.temp.imagesUrl 不存在 
      if (!this.temp.imagesUrl){
        this.temp.imagesUrl=[];
      }
      this.productModal.show();
      this.isNew = false;
    }else if (status === 'delete'){
      this.temp = {...product}
      this.delProductModal.show();
    }
  },
},
//生命週期
mounted(){
  this.checkLogin();

  this.productModal = new bootstrap.Modal(this.$refs.productModal, {
    keyboard: false
  })

  this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal, {
    keyboard: false
  })
}
})


app.mount('#app')


