<template>
    <div class="SphereLeadForm pt-8" v-if="typeof sphereById !== 'undefined'">
        <!--<h1 class="text--primary text-center">Create lead</h1>
        <h2 class="text&#45;&#45;secondary text-center">Sphere: {{sphereById.sphere.name}}</h2>-->
        <h1 class="sphere__header">
            <svg xmlns="http://www.w3.org/2000/svg" id="textSpans" class="svg__lead">
                <defs>
                    <path id="wavyPath2"
                          d="M 10 80 C 160 10 210 10 360 80" />
                    <pattern id="myFontFill" width="100" height="100" patternUnits="userSpaceOnUse">
                        <image xlink:href="/img/wood.jpg"
                               x="0" y="0" width="1000" height="1000"/>
                    </pattern>
                </defs>
                <text font-size="50" fill="url(#myFontFill)" class="lead__text">
                    <textPath xlink:href="#wavyPath2">
                        <tspan>CREATE LEAD</tspan>
                    </textPath>
                </text>
            </svg>
        </h1>
        <h2 class="sphere__header">
            <svg xmlns="http://www.w3.org/2000/svg" class="svg__sphere">
                <text fill="url(#myFontFill)" class="sphere__text">
                    Sphere: {{sphereById.sphere.name}}
                </text>
            </svg>
        </h2>
        <v-form ref="form" id="leadForm">
            <input type="hidden" name="sphere_id" :value="sphereById.sphere.id">
            <input type="hidden" name="source" value="client">
            <div
                    class="form-group pa-10"
                    v-for="(attribute, index) in attributes"
                    :key="index"
            >
                <div class="attr__card">
                    <v-card
                        class="mx-auto pa-5"
                        :id="attribute.name"
                        color="#cccccc75"
                >
                    <i
                            class="ic ma-3"
                            :style="{
                            backgroundImage: 'url(' + attribute.icon + ')'
                        }"
                    />
                    <v-flex xs12 :style="{display: 'inline-block', verticalAlign: 'top'}">
                        <div class="title contact-attr-title mt-3">
                            {{ attribute.label }}
                        </div>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                            v-if="attribute.type === 'text' || attribute.type === 'tel'  || attribute.type === 'email'"
                            :type="attribute.type"
                            :name="attribute.name"
                            :value="getValue(attribute.name)"
                            :required="attribute.name === 'name' || attribute.name === 'phone'"
                            @input="setColor(attribute.name, attribute.type)"
                            font-size="1em"
                        />
                    </v-flex>

                    <v-flex xs12 v-if="attribute.type === 'date'">
                        <v-menu
                                ref="menu1"
                                v-model="menu1"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                        v-model="dateFormatted"
                                        label="Date"
                                        :name="'fields[' + attribute.name + ']'"
                                        prepend-icon="event"
                                        v-bind="attrs"
                                        @blur="date = parseDate(dateFormatted)"
                                        @input="setColor(attribute.name, attribute.type)"
                                        v-on="on"
                                />
                            </template>
                            <v-date-picker
                                    v-model="date"
                                    no-title
                                    @input="menu1 = false"
                                    @change="setColor(attribute.name, attribute.type)"
                            />
                        </v-menu>
                    </v-flex>

                    <v-flex xs12>
                        <v-radio-group
                                row wrap
                                v-if="attribute.type === 'radio'"
                        >
                            <v-flex
                                    lg3
                                    md4
                                    sm6
                                    xs12
                                    v-for="(option, index2) in attribute.options"
                                    :key="index2"
                                    @click="setColor(attribute.name, attribute.type)"
                                >
                                <v-radio
                                        :value="option.value"
                                        :label="option.label"
                                        :name="'fields[' + option.value + ']'"
                                />
                            </v-flex>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12>
                        <v-layout v-if="attribute.type === 'checkbox'" row wrap>
                            <v-flex
                                    lg3
                                    md4
                                    sm6
                                    xs12
                                    v-for="(option, index2) in attribute.options"
                                    :key="index2"
                                    @click="setColor(attribute.name, attribute.type)"
                            >
                                <v-checkbox
                                        :value="option.value"
                                        :label="option.label"
                                        :name="'fields[' + option.value + ']'"
                                />
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-textarea
                            v-if="attribute.type === 'textarea'"
                            :name="attribute.name"
                            :type="attribute.type"
                            @input="setColor(attribute.name, attribute.type)"
                    />
                </v-card>
                    <div
                            class="attr__card__pin"
                            :style="{
                                backgroundImage:
                                 `url(/img/pin_${Math.floor(Math.random() * 8) + 1}.png)`
                            }"
                    ></div>
                </div>
            </div>

            <div class="lead__actions">
                <v-btn
                        color="error"
                        @click="reset"
                >
                    Reset Form
                </v-btn>

                <v-btn
                        color="success"
                        class="ma-10"
                        @click="submit"
                >
                    Send lead
                </v-btn>
            </div>
        </v-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['id'],
    computed: {
        sphereById() {
            return this.$store.getters['sphere/sphereById'](+this.id);
        },
        attributes() {
            const sphere = this.sphereById;
            if (typeof sphere !== 'undefined' && typeof sphere.attributes !== 'undefined') {
                return sphere.attributes;
            }
            return null;
        },
        isUserLoggedIn() {
            return this.$store.getters['user/isUserLoggedIn'];
        },
        getUser() {
            return this.$store.getters['user/userObj'];
        },
        pinURL() {
            console.log(Math.floor(Math.random() * 8) + 1);
            return `${process.env.BASE_URL}img/pin_${
                Math.floor(Math.random() * 8) + 1}.png`;
        },
    },
    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.date);
        },
    },
    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: null,
            menu1: false,
            name: '',
            phone: '',
        };
    },
    methods: {
        reset() {
            this.$refs.form.reset();
        },
        submit() {
            const formElement = document.getElementById('leadForm');
            const data = new FormData(formElement);
            data.append('api_key', process.env.VUE_APP_API_KEY);
            try {
                axios({
                    method: 'post',
                    url: `${process.env.VUE_APP_API_OLD_URL}sphere/form/data/save`,
                    data,
                    config: {headers: {'Content-Type': 'multipart/form-data'}},
                }).then((response) => {
                    //handle success
                    const dataResp = response && response.data;
                    console.log(dataResp);
                    if (dataResp.status === 'success') {
                        if (this.isUserLoggedIn) {
                            this.$router.push('/history');
                        } else {
                            this.$router.push('/');
                        }
                    }
                    if (typeof dataResp.error !== 'undefined') {
                        this.$store.dispatch('setError', dataResp.error, {root: true});
                        console.log(this.errors);
                    }
                })
                    .catch((response) => {
                    //handle error
                        console.log(response.errors);
                        this.$store.dispatch('setError', response.errors, {root: true});
                    });
            } catch (error) {
                console.log(error);
                this.$store.dispatch('setError', error, {root: true});
            }
        },
        formatDate(date) {
            if (! date) return null;

            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        },
        parseDate(date) {
            if (! date) return null;

            const [month, day, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },
        setColor(name, type) {
            let collections = [];
            let val = '';
            if (type === 'text' || type === 'tel' || type === 'email' || type === 'textarea') {
                collections = document.getElementsByName(name);
                val = collections[0].value;
            } else if (type === 'date') {
                collections = document.getElementsByName(`fields[${name}]`);
                val = this.dateFormatted;
            } else if (type === 'radio' || type === 'checkbox') {
                collections = document.getElementById(name).getElementsByTagName('input');
                //const res = [].filter.call(collections, (node) => node.checked === true);
                console.log(collections);
                //console.log(this);
                for (let i = 0; i < collections.length; i++) {
                    console.log(collections[i].checked);
                    if (collections[i].checked) {
                        val = 'checked';
                        break;
                    }
                }
            }

            if (typeof collections[0] !== 'undefined') {
                //console.dir(collections[0]);
                //console.log(collections[0].value);
                if (val !== '') {
                    //document.getElementById(name).style.background = 'none';
                    document.getElementById(name).style.backgroundColor = '#c5e1a590';
                } else {
                    document.getElementById(name).style.backgroundColor = '#cccccc85';
                }
            }
        },
        getValue(name) {
            if (this.isUserLoggedIn) {
                const user = this.getUser;
                console.log(user);
                switch (name) {
                    case 'name':
                        return `${user.firstName} ${user.lastName}`;
                    case 'phone':
                        return user.phone;
                    case 'email':
                        return user.email;
                    default:
                        return null;
                }
            }
            return null;
        },
    },
    mounted() {
        if (this.isUserLoggedIn) {
            this.setColor('name', 'text');
            this.setColor('phone', 'text');
            this.setColor('email', 'text');
        }
    },
};
</script>

<style lang="scss">
    //Variables
    $headerWidth: 500px;
    $headerLeadWidth: 368px;
    $pinWidth: 50px;
    $pinOffset: -20px;

    .SphereLeadForm {
        //background: url('https://www.aduvan.ru/wp-content/uploads/photo-gallery/paper-texturs/paper-texture_(4).jpg');
        background: url('https://www.aduvan.ru/wp-content/uploads/photo-gallery/wood-texturs/wood-texture_(6).jpg');
        //background: url('https://3djungle.ru/upload/iblock/100/10014217f50ae2614e527276c47a64dd.jpg');
    }

    i.ic {
        height: 30px;
        width: 30px;
        display: inline-block;
        background-size: contain;
        background-position: 50%;
        background-repeat: no-repeat;
    }

    .lead__actions {
        text-align: center;
    }

    svg {
        /*display: inline-block;*/
        overflow:visible;
    }

    svg.svg__sphere {
        max-width: $headerWidth;
    }

    svg.svg__lead {
        width: $headerLeadWidth;
    }

    .sphere__header {
        /*margin-top: 50px;*/
        text-align: center;
    }

    .sphere__text {
        font-family: 'Lobster', cursive;
        font-size: 2em;
        text-shadow: 3px 3px 3px #000;
        max-width: $headerWidth;
    }

    .lead__text {
        font-family: 'Ruslan Display', cursive;
        text-shadow: 3px 3px 3px #000;
        width: $headerLeadWidth;
    }

    #leadForm {
        margin-top: -167px;
    }

    .attr__card {
        background: url("https://3djungle.ru/upload/resize_cache/iblock/965/400_400_1/965b3a72dec6ff53f629f078331d0d0d.jpg");       //пробка
        /*background: url("https://3djungle.ru/upload/resize_cache/iblock/d78/400_400_1/d78d39765489c09222e55e9609042dc1.jpg");       //пробка вертикальная*/
        /*background: url("https://3djungle.ru/upload/resize_cache/iblock/d91/400_400_1/d911736008ed42cb9de330f0e294d7f4.jpg");       //пробка разное зерно*/
        /*background: url("https://3djungle.ru/upload/resize_cache/iblock/b81/400_400_1/b81aa5f4e5fecc44b0a73c9504dbd83b.jpg");       //пробка круглая большая*/
        /*background: url("https://3djungle.ru/upload/resize_cache/iblock/489/400_400_1/4890319d8159d1f2278b1a6682f1ea1a.jpg");       //газета*/
        /*background: url("https://3djungle.ru/upload/resize_cache/iblock/b45/400_400_1/b45c663e0cd523281265ed64df1e13f0.jpg");       //линейка высокая*/
        /*background: url("https://3djungle.ru/upload/resize_cache/iblock/172/400_400_1/17214d7e078f80e7fd3c60fde06a88a7.jpg");       //линейка застареная*/
        /*background: url("https://3djungle.ru/upload/resize_cache/iblock/92a/400_400_1/92ad5e78680a28cd7e0e5d4e4d1e84ad.jpg");       //линейка с полями*/
        /*background: url("https://3djungle.ru/upload/resize_cache/iblock/541/400_400_1/541a1e1b42dc8c23dd55637db0568916.jpg");       //упаковка*/
        /*background: url("https://3djungle.ru/upload/resize_cache/iblock/63a/400_400_1/63abfdbd62c87d163e497ed4246a7dba.jpg");*/   //рукопись
        //background: url("https://3djungle.ru/upload/resize_cache/iblock/061/400_400_1/0612cd0a13db4d00ca47e22366ffe8bd.jpg");     //белая пробка
        /*background: url("https://3djungle.ru/upload/resize_cache/iblock/79e/400_400_1/79efd92a8a85deaec877b87737686b3d.jpg");*/   //клетка
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        text-shadow: 0 0 2px #000;
        -webkit-box-shadow: 0 0 5px #000;
        -moz-box-shadow: 0 0 5px #000;
        box-shadow: 0 0 5px #000;
        position: relative;
    }

    .attr__card__pin {
        content: "";
        display: inline-block;
        position: absolute;
        right: $pinOffset;
        top: $pinOffset;
        width: $pinWidth;
        height: $pinWidth;
        background-size: contain;
    }

    input[type~="text"], input[type~="tel"], input[type~="email"], textarea {
        font-size: 20px;
        font-weight: bold;
    }
</style>
