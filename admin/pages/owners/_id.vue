<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center">Update Owner:{{ owner.name }}</h2>
                        <form>

                            <!-- Title -->
                            <div class="a-spacing-top-medium">
                                <label>Name</label>
                                <input
                                 type="text"
                                 :placeholder="owner.name"
                                  v-model="formData.name"
                                   class="a-input-text"
                                    style="width:100%" />
                            </div>
                            <!-- description -->
                            <div class="a-spacing-top-medium">
                                <label>Description</label>
                                <textarea 
                                v-model="formData.description" 
                                :placeholder="owner.description"                                
                                style="width:100%"></textarea>
                            </div>
                            <!-- Image string  making use of this image string -->
                            <div class="a-spacing-top-medium">
                                <label>Paste owner Image url</label>
                                <input
                                 type="text"
                                 :placeholder="owner.photo"
                                  v-model="formData.photo"
                                   class="a-input-text" 
                                   style="width:100%" />
                                <img :src="owner.photo" class="img-fluid" style="width:50px; height: 50px;" />
                            </div>

                            <hr />
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onUpdateOwner">Update Owner </span>
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
            let response = await $axios.$get(`http://localhost:3000/api/owners/${params.id}`);
           // console.log("owner is " , response)
            return {
                owner: response.owner
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
        async onUpdateOwner() {
            console.log("this form data", this.formData)
            try {
                await this.$axios.$put(`http://localhost:3000/api/owners/${this.$route.params.id}`, this.formData);
                 this.$router.push("/owners");

            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>