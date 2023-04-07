<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center">Update Product - {{ product.title }}</h2>
                        <form>
                            <!-- Category Dropdown -->
                            <div class="a-spacing-top-medium">
                                <label>Category</label>
                                <select class="a-select-option" v-model="formData.categoryID">
                                    <option v-for="category in categories" :key="category._id" :value="category._id">
                                        {{ category.type }}
                                    </option>
                                </select>
                            </div>
                            <!-- Owner Dropdown -->
                            <div class="a-spacing-top-medium">
                                <label>Owner</label>
                                <select class="a-select-option" v-model="formData.ownerID">
                                    <option v-for="owner in owners" :key="owner._id" :value="owner._id">
                                        {{ owner.name }}</option>
                                </select>
                            </div>
                            <!-- Title -->
                            <div class="a-spacing-top-medium">
                                <label>Title</label> 
                                <input type="text"
                                :placeholder="product.title"
                                 v-model="formData.title"
                                 class="a-input-text"
                                 style="width:100%" />
                            </div>
                            <!-- Pricee -->
                            <div class="a-spacing-top-medium">
                                <label>Price</label> 
                                <input 
                                type="number"
                                :placeholder="product.price"
                                 v-model="formData.price"
                                  class="a-input-text" 
                                  style="width:100%" />
                            </div>
                            <!-- stockQuantity -->
                            <div class="a-spacing-top-medium">
                                <label>stock Quantity</label>
                                <input
                                 type="number"
                                 :placeholder="product.stockQuantity"
                                  v-model="formData.stockQuantity"
                                  class="a-input-text"
                                  style="width:100%" />
                            </div>
                            <!-- description -->
                            <div class="a-spacing-top-medium">
                                <label>Description</label> 
                                <textarea
                                :placeholder="product.description"
                                v-model="formData.description"
                                style="width:100%"></textarea>
                            </div>
                            <!-- Image string  making use of this image string -->
                            <div class="a-spacing-top-medium">
                                <label>Paste Image url</label>
                                <input type="text" v-model="formData.photo" class="a-input-text" style="width:100%" />
                                <img :src="product.photo" class="img-fluid" style="width:50px; height: 50px;" />
                            </div>                     
                            <hr />
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onUpdateProduct">Add Product</span>
                                    </span>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
export default {

    async asyncData({ $axios, params }) {
        try {
            let categories = $axios.$get("http://localhost:3000/api/categories");
            let owners = $axios.$get("http://localhost:3000/api/owners");
            let product = $axios.$get(`http://localhost:3000/api/products/${params.id}`);

            const [catResponse, ownerResponse, productResponse] = await Promise.all([categories, owners, product]);
            //console.log("categories", catResponse);
            // console.log("owners", ownerResponse);
            console.log("product is single",  productResponse);
            return {
                categories: catResponse.categories,
                owners: ownerResponse.owners,
               product: productResponse.product
            }
        } catch (error) {
            console.log(error)
        }
    },
    data() {
        return {
            formData:
            {
                categoryID: null,
                ownerID: null,
                title: "",
                price: "",
                stockQuantity: "",
                description: "",
                photo: "",
                selectedFile: null,
                fileName: ""
            }
        }
    },
    methods: {
        onFileSelected(event) {
            this.formData.selectedFile = event.target.files[0];
            console.log(this.formData.selectedFile)
            this.formData.fileName = event.target.files[0].name;
        },
        async onUpdateProduct() {

            console.log("form data is ", this.formData)

            try {
                await this.$axios.$put(`http://localhost:3000/api/products/${this.$route.params.id}`, this.formData);
                this.$router.push("/");
            }
            catch (error) {
                console.log(error)
            }

        }
    }
}
</script>

