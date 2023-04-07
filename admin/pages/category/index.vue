<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center">Add a new Category</h2>
                        <form>
                            <div class="a-spacing-top-medium">
                                <label>Category</label>{{ type }}
                                <input type="text" v-model="type" class="a-input-text" style="width:100%" />
                            </div>
                            <hr />
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onAddCategory">Add Category</span>
                                    </span>
                                </span>
                            </div>
                        </form>
                        <br />
                        <ul>
                            <li class="list-group-item" v-for="category in categories" :key="category._id">{{ category.type
                            }}</li>
                        </ul>
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
            let response = await $axios.$get("http://localhost:3000/api/categories");

            return {
                categories: response.categories
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
                await this.$axios.$post("http://localhost:3000/api/categories", data)
                this.categories.push(data);
                this.type = " ";

            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>