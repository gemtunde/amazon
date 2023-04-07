<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center">Add a new Owner</h2>
                        <form>

                            <!-- Title -->
                            <div class="a-spacing-top-medium">
                                <label>Name</label>
                                <input type="text" v-model="formData.name" class="a-input-text" style="width:100%" />
                            </div>
                            <!-- description -->
                            <div class="a-spacing-top-medium">
                                <label>Description</label>
                                <textarea v-model="formData.description" placeholder="Enter Owner description"
                                    style="width:100%"></textarea>
                            </div>
                            <!-- Image string  making use of this image string -->
                            <div class="a-spacing-top-medium">
                                <label>Paste owner Image url</label>
                                <input type="text" v-model="formData.photo" class="a-input-text" style="width:100%" />
                                <img :src="formData.photo" class="img-fluid" style="width:50px; height: 50px;" />
                            </div>

                            <hr />
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onAddOwner">Add Owner </span>
                                    </span>
                                </span>
                            </div>
                        </form>
                        <br />
                        <ul>
                            <li class="list-group-item" v-for="owner in owners" :key="owner._id">
                                {{ owner.name }}
                            </li>
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
            let response = await $axios.$get("http://localhost:3000/api/owners");
            return {
                owners: response.owners
            }
        } catch (error) {
            console.log(error);
        }

    },
    data() {

        return {
            formData: {
                name: "",
                description: "",
                photo: ""
            }
        }
    },
    methods: {
        async onAddOwner() {
            console.log("this form data", this.formData)
            try {
                await this.$axios.$post("http://localhost:3000/api/owners", this.formData);
                this.owners.push(this.formData);
                this.formData = "";
                // this.formData.description = "";
                // this.formData.photo = "";
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>