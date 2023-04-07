<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center">Add a new Product</h2>
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
                                <label>Title</label> {{ formData.title }}
                                <input type="text" v-model="formData.title" class="a-input-text" style="width:100%" />
                            </div>
                            <!-- Pricee -->
                            <div class="a-spacing-top-medium">
                                <label>Price</label> {{ formData.price }}
                                <input type="number" v-model="formData.price" class="a-input-text" style="width:100%" />
                            </div>
                            <!-- stockQuantity -->
                            <div class="a-spacing-top-medium">
                                <label>stock Quantity</label>{{ formData.stockQuantity }}
                                <input type="number" v-model="formData.stockQuantity" class="a-input-text"
                                    style="width:100%" />
                            </div>
                            <!-- description -->
                            <div class="a-spacing-top-medium">
                                <label>Description</label> {{ formData.description }}
                                <textarea placeholder="Enter product description" v-model="formData.description"
                                    style="width:100%"></textarea>
                            </div>
                            <!-- Image string  making use of this image string -->
                            <div class="a-spacing-top-medium">
                                <label>Paste Image url</label>
                                <input type="text" v-model="formData.photo" class="a-input-text" style="width:100%" />
                                <img :src="formData.photo" class="img-fluid" style="width:50px; height: 50px;" />
                            </div>
                            <!-- Photo -->
                            <!-- <div class="a-spacing-top-medium">
                                <label>Add Photo</label>
                                <div class="a-row a-spacing-top-medium">
                                    <label class="choosefile-button">
                                        <i class="fal fa-plus"></i>
                                        <input type="file" @change="onFileSelected" />
                                        <p style="margin-top: -70px;">{{ formData.fileName }}</p>
                                    </label>
                                </div>
                              </div> -->
                            <!-- button -->
                            <hr />
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onAddProduct">Add Product</span>
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

    async asyncData({ $axios }) {
        try {
            let categories = $axios.$get("http://localhost:3000/api/categories");
            let owners = $axios.$get("http://localhost:3000/api/owners");

            const [catResponse, ownerResponse] = await Promise.all([categories, owners]);
            //console.log("categories", catResponse);
            // console.log("owners", ownerResponse);
            return {
                categories: catResponse.categories,
                owners: ownerResponse.owners,
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
                price: 0,
                stockQuantity: 1,
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
        async onAddProduct() {
            //new form data not working

            // let data = new FormData();
            // data.append("title", this.title);
            // data.append("price", this.price);
            // data.append("description", this.description);
            // data.append("stockQuantity", this.stockQuantity);
            // data.append("ownerID", this.ownerID);
            // data.append("categoryID", this.categoryID);
            // data.append("photo", this.selectedFile, this.selectedFile.name);

            console.log("form data is ", this.formData)

            try {
                await this.$axios.$post("http://localhost:3000/api/products", this.formData);
                this.$router.push("/");
            }
            catch (error) {
                console.log(error)
            }

        }
    }
}
</script>

