<template>
  <!--MAIN-->
  <main>
    <!--REVIEW ADDRESS-->
    <div class="reviewPage mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
            <div class="a-spacing-top-medium">
              <h1 class="a-spacing-base">
                <b>Create Review</b>
              </h1>
              <div class="row">
                <!-- Product Photo -->
                <div class="col-md-2 col-sm-3 col-3">
                  <img :src="product.photo" style="width: 80px" />
                   <!-- <img src="/img/avatar.png" class="img-fluid" style="width: 50px;" /> -->
                </div>
                <!-- Product Title -->
                <div class="col-md-10 col-sm-9 col-9 m-auto">
                  <h4>
                     <b>{{ product.title }}</b>
                  </h4>
                </div>
              </div>
              <div class="a-spacing-top-medium"></div>
              <hr />
              <h2 class="a-spacing-base">Overall Rating</h2>
              <div class="a-row">
                <!-- Rating -->
                <no-ssr>
                  <star-rating v-model="rating"></star-rating>
                </no-ssr>
              </div>
              <div class="a-row a-spacing-top-large">
                <h2>Add photo or video</h2>
                <p
                  style="font-size: 14px; font-weight: 700;"
                >Shoppers find images and videos more helpful than text alone.</p>
              </div>
              <div class="a-row a-spacing-top-medium">
                <!-- Choose a Photo -->
               
                  <input type="text"  style="width: 70%;" v-model="photo" />
                 <img :src="photo" class="img-fluid" style="width: 50px;" />
                <!-- <p>{{ fileName }}</p> -->
               
              </div>
              <div class="a-spacing-top-large"></div>
              <hr />
              <!-- Headline -->
              <div class="headline a-spacing-large">
                <h2 class="a-spacing-base">Add a headline</h2>
                <input
                  type="text"
                  v-model="headline"
                  class="a-input-text"
                  style="width: 70%;"
                  placeholder="What's most important to know?"
                  
                />
              </div>
              <!-- Body -->
              <div class="a-spacing-base">
                <h2 class="a-spacing-base">Write your review</h2>
                <textarea
                  placeholder="What do you like or dislike? What did you see this product for?"
                  style="height:6em; width: 100%;"
                 v-model="body"
                ></textarea>
              </div>
            </div>
            <br />
            <br />
            <hr />
            <div class="a-spacing-top-medium">
              <p
                style="font-size: 14px; font-weight: 700;"
              >This is how you'll appear to other customers:</p>
              <div class="media a-spacing-top-large">
                <div class="media-left">
                  <img src="/img/avatar.png" class="img-fluid" style="width: 50px;" />
                </div>
                <div class="media-body pl-3 pt-2">
                  <input
                    type="text"
                    class="a-input-text"
                    style="width: 100%;"
                    :value="$auth.$state.user.name"
                  />
                </div>
              </div>
            </div>
            <div class="a-row a-spacing-top-medium">
              <span class="a-color-tertiary">Don't worry, you can always change this on your profile</span>
            </div>
            <div class="a-row text-right a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onAddReview">Submit</span>
                </span>
              </span>
            </div>
          </div>
          <div class="col-sm-2"></div>
        </div>
        <div class="a-spacing-large pb-5"></div>
        <hr />
      </div>
    </div>
    <!--/REVIEW ADDRESS-->
  </main>
  <!--/MAIN-->
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  components : {
    StarRating
  },
 async asyncData({$axios, params}){
    try {
      let response = await $axios.$get(`/api/products/${params.id}`);
      return{
        product : response.product
      }
    } catch (error) {
      console.log(error)
    }
 },
 data(){
  return{
    rating : 0,
    photo : "",
    body: "",
    headline : ""
  }
 },
 methods : {
      async onAddReview(){
        try {
          let data = {
            rating : this.rating,
            photo : this.photo,
            body : this.body,
            headline : this.headline,
          };
          console.log("data is ", data)
          let response = await this.$axios.$post(`/api/reviews/${this.$route.params.id}`, data)
          if(response.success){
            this.$router.push(`/products/${this.$route.params.id}`)
          }
          
        } catch (error) {
          console.log(error)
        }
      }
 }
};
</script>
