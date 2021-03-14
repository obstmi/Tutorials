var eventBus = new Vue()

Vue.component('product-review', {
    template: `
        <!-- Two-way data binding 
        <input v-model="name"> -->

        <form class="review-form" @submit.prevent="onSubmit"> <!-- Modifier: page won't refresh -->

        <p v-if="errors.length">
            <b>Please correct the following error(s)</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>

        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating"> <!-- Modifier: type cast = number -->
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>

        <p>Would you recommend this poduct</p>
        <fieldset>
            <input type="radio" id="yes" v-model="reco" name="recommendation" value="Yes">
            <label for="yes">Yes :-)</label>
            <input type="radio" id="no" v-model="reco" name="recommendation" value="No">
            <label for="no">No :-(</label>
        </fieldset>
        <p>
            <input type="submit" value="Submit">
        </p>

        </form>

    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
            reco: null
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.reco) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    reco: this.reco
                };
                // this.$emit('review-submitted', productReview);
                eventBus.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.reco = null;
                this.errors = [];
            }
            else {
                this.errors = [];
                if (!this.name) this.errors.push("Name required.");
                if (!this.rating) this.errors.push("Rating required.");
                if (!this.review) this.errors.push("Review required.");
                if (!this.reco) this.errors.push("Recommendation required.");
            }
        }
    }

})


Vue.component('productDetails', {
    props: {
        details: {
            type: Array
        }
    },
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    }
})

Vue.component('product', {
    props: {
        primium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
    <div class="product-image">
        <img v-bind:src="image" v-bind:alt="altText"/>
    </div>
    <div class="product-info">
        <!-- :href = v-bind:href -->
        <a :href="aLink">
            <h1>{{ title }}</h1>
        </a>
        <p v-if="inStock">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
        <p v-else :class = "{outOfStock: !inStock}">Out of Stock</p>
        <!-- 
        <p>Shipping: {{ shipping }}</p>
        -->
        <p><span v-if="isOnSale">{{ title }} is on Sale!</span></p>
        <productDetails :details = "ditails"></productDetails>

        <!-- ToDo: Warum nur eine {} in :style? -->

        <div v-for="(variant, index) in variants" 
        :key="variant.variantId"
        class = "color-box"
        :style = "{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)">
        </div>
        <!-- @mouseover = v-on:mouseover -->
        <ul>
            <li v-for="size in sizes">{{ size }}</li>
        </ul>

        <!-- @click = v-on:click -->
        <button v-on:click="addToCart" 
        :disabled = "!inStock"
        :class = "{disabledButton: !inStock}">Add to Cart</button>

        <button @click="takeFromCart">Take from Cart</button>

    </div>

    <product-tabs :reviews="reviews" :shipping="shipping" :details="ditails"></product-tabs>

    <!--
    <product-review @review-submitted="addReview"></product-review>
    -->


</div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            description: 'They are super',
            //image: './ressources/vmSocks-green-onWhite.jpg',
            selectedVariant: 0,
            altText: 'A pair of socks',
            aLink: 'http://google.de',
            inventory: 100, //nur zu Testzwecken, da Artikel-unspezifisch
            //inStock: true,
            //onSale: true,
            //cart: 0,
            ditails: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: './ressources/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10,
                    onSale: true
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: './ressources/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 1,
                    //onSale: false
                    onSale: true
                }
            ],
            sizes: ["extra-small", "small", "medium", "large", "extra-large"],
            reviews: []
        }
    },
    methods: {
        addToCart_alt: function () {
            this.cart += 1
        },
        updateProduct_alt: function (variantImage) {
            this.image = variantImage;
        },
        addToCart() {
            //this.cart += 1
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId) // übergeordnete App informieren
        },
        takeFromCart() {
            //if (this.cart > 0) {
            //    this.cart -= 1
            //}
            this.$emit('take-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        addToCart_notWorking: () => {
            this.cart += 1
        },
        updateProduct_notWorking: (variantImage) => {
            this.image = variantImage;
        }
        // jetzt über Eventbus:
        // addReview(productReview) {
        //    this.reviews.push(productReview)
        // }
    },
    // computed values werden gecacht und nicht jedes Mal neu berechnet (im Gegensatz zu Methoden)
    computed: {
        title() {
            console.log('Die selektierte variante: ' + this.selectedVariant);
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        isOnSale() {
            return this.variants[this.selectedVariant].onSale;
        },
        shipping() {
            if (this.primium) {
                return "Free";
            } else {
                return "2,99";
            }
        }
    },

    // What’s mounted? 
    // That’s a lifecycle hook, which is a function that is called once the component has mounted to the DOM. 
    // Now, once product has mounted, it will be listening for the review-submitted event. And once it hears it, it’ll add the new productReview to its data.
    mounted() {
        // an arrow function is bound to its parent’s context:
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
        // ohne arrow-function:
            // eventBus.$on('review-submitted', function (productReview) {
            //    this.reviews.push(productReview)
            //  }.bind(this))
        // manually bind the component’s this to that function
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        },
        shipping: {
            type: String,
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tab"
            :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs" 
                :key="index"
                @click="selectedTab = tab">
            {{ tab }}</span>

            <div v-show="selectedTab === 'Reviews'">

            <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>{{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                    <p>Recommendation: {{ review.reco }}</p>
                    </li>
                </ul>
            </div>
    
            <product-review v-show="selectedTab === 'Make a Review'"></product-review>

            <p v-show="selectedTab === 'Shipping'">Shipping: {{ shipping }}</p>

            <productDetails v-show="selectedTab === 'Details'" :details = "details"></productDetails>

        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
            selectedTab: 'Reviews'
        }
    }
})

var appi = new Vue({
    el: '#app',
    data: {
        preemium: true,
        cart: []

    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        deleteFromCart(id) {
            let index = this.cart.lastIndexOf(id);
            if (index>=0) {
                this.cart.splice(index, 1);
            }
        }

    }
})