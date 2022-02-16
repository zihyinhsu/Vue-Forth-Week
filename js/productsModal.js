//預設匯出
export default{
    props:['temp','isNew','productModal'],
    methods:{
      updateProduct(){
        let apiUrl = `${url}/api/${path}/admin/product`
        let method = 'post'
        let alertContent = '已成功新增商品'
        if(!this.isNew){
          apiUrl = `${url}/api/${path}/admin/product/${this.temp.id}`
          method = 'put';
          alertContent = '已成功修改商品'
        }
    
        axios[method](apiUrl,{data: this.temp})
        .then((res)=>{
          alert(`${alertContent}`)
          //重新刷新頁面
          this.$emit('get-products')
          this.productModal.hide();
        }).catch((err)=>{
          console.log(`更新資料失敗`) 
        })
      },
    },
    template : ` <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span>{{isNew ? '新增' : '編輯'}} 產品</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-2">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control"
                       placeholder="請輸入圖片連結" v-model="temp.imageUrl">
                <img class="img-fluid mt-3" :src="temp.imageUrl" alt="" style="height: 300px;">
              </div>
              <!-- 多圖設置 -->
              <div class="mb-3">
                <h3>多圖設置</h3>
                <!-- 判斷是否是陣列 -->
                <div v-if="Array.isArray(temp.imagesUrl)">
                  <template v-for="(img,key) in temp.imagesUrl" :key="key">
                    <input type="text" class="form-control" v-model="temp.imagesUrl[key]">
                  <img class="img-fluid mt-3" :src="temp.imagesUrl[key]" alt="" style="height: 300px;">           
                  </template>
                  <!-- 1.判斷是否有沒有圖片網址 2. 判斷 imagesUrl 的陣列的特定索引位置有沒有文字-->
                    <button v-if="!temp.imagesUrl.length || temp.imagesUrl[temp.imagesUrl.length-1]"
                      class="btn btn-primary btn-sm d-block w-100" @click="temp.imagesUrl.push('')">
                      新增圖片
                    </button>
                    <button v-else 
                      class="btn btn-outline-danger btn-sm d-block w-100" @click="temp.imagesUrl.pop('')">
                      刪除最後一張圖片
                    </button>
                  
                </div>
              </div>
            </div>
          
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="temp.title">
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">分類</label>
                <input id="category" type="text" class="form-control"
                       placeholder="請輸入分類" v-model="temp.category">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">單位</label>
                <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="temp.unit">
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model="temp.origin_price">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input id="price" type="number" min="0" class="form-control"
                       placeholder="請輸入售價" v-model="temp.price">
              </div>
            </div>
            <hr>

            <div class="mb-3">
              <label for="description" class="form-label">產品描述</label>
              <textarea id="description" type="text" class="form-control"
                        placeholder="請輸入產品描述" v-model="temp.description">
              </textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
              <textarea id="description" type="text" class="form-control"
                        placeholder="請輸入說明內容" v-model="temp.content">
              </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input id="is_enabled" class="form-check-input" type="checkbox"
                       :true-value="1" :false-value="0" v-model="temp.is_enabled">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="updateProduct">
          確認
        </button>
      </div>
    </div>
  </div>`
}