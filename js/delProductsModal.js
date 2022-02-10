//預設匯出
export default{
    props:['temp'],
    methods:{
        deleteProduct(){
            axios.delete(`${url}/api/${path}/admin/product/${this.temp.id}`)
            .then((res)=>{
              alert(`已成功刪除商品`)
              this.$emit('get-products');
              delProductModal.hide();
            }).catch((error)=>{
              alert(error.data.message) 
            })
          },
    },
    template:`<div class="modal-dialog">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 id="delProductModalLabel" class="modal-title">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger">{{temp.title}}</strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-danger" @click="deleteProduct()">
          確認刪除
        </button>
      </div>
    </div>
  </div>`
}