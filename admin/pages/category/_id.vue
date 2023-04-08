<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center">Update Category : {{ category.type }} </h2>
                        <form>
                            <div class="a-spacing-top-medium">
                                <label>Category</label>{{ type }}
                                <input
                                 type="text"
                                 :placeholder="category.type"
                                  v-model="type" 
                                  class="a-input-text" 
                                  style="width:100%"  />
                            </div>
                            <hr />
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onAddCategory">Update Category</span>
                                    </span>
                                </span>
                            </div>
                        </form>
                        <br />                       
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
            let response = await $axios.$get(`http://localhost:3000/api/categories/${params.id}`);

            console.log("single cat" , response)

            return {
                category: response.category
            }

        } catch (error) {
            console.log(error)
        }
    },
    data() {

        return {
            type: ""
        }
    },
    methods: {
        async onAddCategory() {
            const data = { type: this.type }
            try {
                await this.$axios.$put(`http://localhost:3000/api/categories/${this.$route.params.id}`, data)
                 this.$router.push("/category");

            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>