<template>
    <div class="flex h-screen">
        <div class="grow h-screen overflow-y-auto p-4">
            <div v-if="loading" class="flex justify-center items-center h-full animate__animated animate__fadeIn">
                <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
            <div v-else>
                <div class="">
                    <div
                        class="mt-2 pt-4 absolute top-0 left-0 w-full z-10 bg-pale-sky-100 dark:bg-pale-sky-800 rounded-full shadow-lg shadow-pale-sky-500/20">
                        <div class="flex flex-wrap">
                            <button v-if="categories.count > 0" v-for="category in categories.results"
                                :key="category.id" @click="selectedCategory = category.id"
                                class="text-center bg-transparent hover:bg-pale-sky-200 my-auto shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold p-1 border-2 border-pale-sky-900 dark:border-neutral-400 hover:dark:bg-neutral-500 rounded-lg animate__animated hovanimate__swing ml-3 mb-3"
                                :class="{ 'bg-neutral-400 dark:bg-pale-sky-600': category.id === selectedCategory }">
                                {{ category.title }}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-16">
                    <div v-if="filteredProducts.length !== 0" v-for="product in filteredProducts" :key="product.id"
                        class="group relative bg-pale-sky-200 dark:bg-pale-sky-800 p-3 rounded-md">
                        <a href="" class="animate__animated animate__fadeIn" @click.prevent="openModal(product)">
                            <carditem :imagesrc="'data:image/png;base64,' + product.images" :title="product.title"
                                :price="product.price" />

                        </a>
                        <div class="flex flex-row-reverse pt-1 animate__animated animate__fadeIn">
                            <button v-if="!product.quantity" @click="product.quantity = 1; addToCart(product);"
                                class="mt-2 py-1 w-full middle none center rounded-full bg-white font-mono font-bold uppercase shadow-md shadow-pale-sky-500/20 transition-all duration-200 hover:shadow-lg active:bg-pale-sky-900 active:text-pale-sky-400 text-black text-2xl">+</button>
                            <div v-else
                                class="mt-2 w-full middle none center rounded-full bg-white font-mono text-xs font-bold uppercase text-white shadow-md shadow-pale-sky-500/20 transition-all hover:shadow-lg">
                                <div class="flex flex-row justify-between px-2">
                                    <button @click="product.quantity--; updateQuantityGood(product)"
                                        class="w-8 text-black bg-white text-2xl my-1 rounded-full hover:bg-black hover:text-white transition-all duration-300 ease-in-out">-</button>
                                    <label
                                        class="block font-medium text-gray-900 my-auto text-xl animate__animated animate__fadeIn"
                                        for="quantity">{{ product.quantity }}</label>
                                    <button @click="product.quantity++; updateQuantityGood(product)"
                                        class="w-8 text-black bg-white text-2xl my-1 rounded-full hover:bg-black hover:text-white transition-all duration-300 ease-in-out">+</button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="animate__animated animate__fadeIn" v-else>Нет данных</div>
                </div>
                <div class="fixed bottom-0 left-0 w-full p-4">
                    <button @click="openOrderModal"
                        class="w-full py-3 px-6 bg-pale-sky-800 dark:bg-pale-sky-50 dark:text-black text-white font-semibold rounded-xl hover:bg-pale-sky-700 dark:hover:bg-pale-sky-600 transition duration-200 animate__animated shadow-md shadow-gray-400 dark:shadow-pale-sky-700 hover:shadow-lg"
                        :class="{ 'animate__fadeInUp': cartItems.length > 0, 'animate__fadeOutDown': cartItems.length === 0 }">
                        <div class="flex flex-row justify-between">
                            <div>40min</div>
                            <div>Заказ</div>
                            <div>{{ totalPrice }}руб</div>
                        </div>
                    </button>
                </div>

                <div class="m-2 fixed z-50 inset-0 transition duration-200 animate__animated"
                    :class="{ 'animate__fadeInUp': isopenOrderModal, 'animate__fadeOutDown': isopenOrderModal !== true }">
                    <div class="relative bg-white rounded-lg h-full w-full mx-auto">
                        <!-- Здесь размещается содержимое вашего модального окна заказа -->
                        <button @click="isopenOrderModal = false"
                            class="absolute top-0 left-0 p-5 text-gray-500 hover:text-gray-700">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12">
                                </path>
                            </svg>
                        </button>

                        <h3 class="text-center text-xl font-semibold mb-4 pt-4">Оформление заказа</h3>

                        <div class="px-8 h-full">
                            <div class="">
                                <ul class="max-h-screen overflow-y-auto">
                                    <li v-for="(product, index) in cartItems" :key="product.id" class="">
                                        <div class="flex items-center">
                                            <img :src="'data:image/png;base64,' + product.images" alt="Product Image"
                                                class="w-20 h-20 object-cover mr-4">
                                            <div class="flex-grow">
                                                <div class="flex justify-between items-center">
                                                    <span class="text-lg font-semibold text-centerx">{{ product.title
                                                        }} <span class="text-yellow-600">{{ product.quantity
                                                            }}x</span></span>
                                                </div>
                                                <div class="text-right text-lg font-semibold">{{ product.price *
                product.quantity }}руб.
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                                <UDivider type="dashed" />
                                <div class="text-center">Всего: {{ totalItems }}шт.</div>
                                <div class="fixed bottom-0 left-0 w-full p-4">
                                    <button @click="openOrderCredetionalsModal"
                                        class="w-full py-3 px-6 bg-pale-sky-800 dark:bg-pale-sky-50 dark:text-black text-white font-semibold rounded-xl hover:bg-pale-sky-700 dark:hover:bg-pale-sky-600 transition duration-200 animate__animated shadow-md shadow-gray-400 dark:shadow-pale-sky-700 hover:shadow-lg"
                                        :class="{ 'animate__fadeInUp': cartItems.length > 0, 'animate__fadeOutDown': cartItems.length === 0 }">
                                        <div class="flex flex-row justify-between">
                                            <div>40min</div>
                                            <div>Ввести личные данные</div>
                                            <div>{{ totalPrice }}руб</div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>

                <div class="m-2 fixed z-50 inset-0 transition duration-200 animate__animated" :class="{
                'animate__fadeInRight': isopenOrderCreditionalsModal, 'animate__fadeOutRight': isopenOrderCreditionalsModal !== true
            }">
                    <div class="relative bg-white rounded-lg h-full w-full mx-auto">
                        <!-- Здесь размещается содержимое вашего модального окна заказа -->
                        <button @click="isopenOrderCreditionalsModal = false"
                            class="absolute top-0 left-0 p-5 text-gray-500 hover:text-gray-700">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12">
                                </path>
                            </svg>
                        </button>

                        <h3 class="text-center text-xl font-semibold mb-4 pt-4">Личные данные</h3>

                        <div class="px-8 h-full overflow-y-auto">
                            <div class=" h-full overflow-y-auto">
                                <div class="mb-4 flex flex-row gap-3">
                                    <div>
                                        <label for="" class="block text-sm font-medium text-gray-700">Фамилия</label>
                                        <input type="text" id="" placeholder="Иванов"
                                            v-model="customer_order.customer_surname" class=" mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2
                                            px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                                            sm:text-sm transition-all duration-300 ease-in-out"
                                            :class="{ 'border-red-500': !customer_order.customer_surname }">
                                        <div v-if="!customer_order.customer_surname" class="text-red-500 text-xs p-1">
                                            required</div>
                                    </div>
                                    <div>
                                        <label for="" class="block text-sm font-medium text-gray-700">Имя</label>
                                        <input type="text" id="" placeholder="Иван"
                                            v-model="customer_order.customer_name"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"
                                            :class="{ 'border-red-500': !customer_order.customer_name }">
                                        <div v-if="!customer_order.customer_name" class="text-red-500 text-xs p-1">
                                            required</div>
                                    </div>
                                    <div>
                                        <label for="" class="block text-sm dfont-medium text-gray-700">Отчество</label>
                                        <input type="text" id="" placeholder="Иванович"
                                            v-model="customer_order.customer_lastname"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"
                                            :class="{ 'border-red-500': !customer_order.customer_lastname }">
                                        <div v-if="!customer_order.customer_lastname" class="text-red-500 text-xs p-1">
                                            required</div>
                                    </div>
                                </div>
                                <div class="mb-4 flex flex-row gap-3">
                                    <div>
                                        <label for="" class="block text-sm font-medium text-gray-700">Электронная
                                            почта</label>
                                        <input type="text" id="" placeholder="example@example.com"
                                            v-model="customer_order.customer_email"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"
                                            :class="{ 'border-red-500': !customer_order.customer_email }">
                                        <div v-if="!customer_order.customer_email" class="text-red-500 text-xs p-1">
                                            required</div>
                                    </div>
                                    <div>
                                        <label for="" class="block text-sm font-medium text-gray-700">Телефон</label>
                                        <input type="text" id="ъ" placeholder="+7 (___) ___-__-__"
                                            v-model="customer_order.customer_phone"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"
                                            :class="{ 'border-red-500': !customer_order.customer_phone }">
                                        <div v-if="!customer_order.customer_phone" class="text-red-500 text-xs p-1">
                                            required</div>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <label for="" class="block text-sm font-medium text-gray-700">Адрес</label>
                                    <input type="text" id="" placeholder="ул. Пушкина 4"
                                        v-model="customer_order.order_address"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"
                                        :class="{ 'border-red-500': !customer_order.order_address }">
                                    <div v-if="!customer_order.order_address" class="text-red-500 text-xs p-1">
                                        required</div>
                                </div>
                                <div class="mb-4">
                                    <label for="" class="block text-sm font-medium text-gray-700">Комментарий</label>
                                    <textarea placeholder="Оставьте комментарий..." v-model="customer_order.description"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"></textarea>
                                </div>
                                <URadioGroup color="indigo" v-model="selected" legend="Выберите тип оплаты"
                                    :options="options" />
                                <div class="py-20"></div>
                                <div class="fixed bottom-0 left-0 w-full p-4">
                                    <button @click="createorder"
                                        class="w-full py-3 px-6 bg-pale-sky-800 dark:bg-pale-sky-50 dark:text-black text-white font-semibold rounded-xl hover:bg-pale-sky-700 dark:hover:bg-pale-sky-600 transition duration-200 animate__animated shadow-md shadow-gray-400 dark:shadow-pale-sky-700 hover:shadow-lg"
                                        :class="{ 'animate__fadeInUp': cartItems.length > 0, 'animate__fadeOutDown': cartItems.length === 0 }">
                                        <div class="flex flex-row justify-between">
                                            <div>40min</div>
                                            <div>{{ userid }}</div>
                                            <div>{{ totalPrice }}руб</div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
                <div class="m-2 fixed z-50 inset-0 transition duration-200 animate__animated" :class="{
                'animate__fadeInRight': isopenOrder, 'animate__fadeOutRight': isopenOrder !== true
            }">
                    <div class="relative bg-white rounded-lg h-full w-full mx-auto">
                        <!-- Здесь размещается содержимое вашего модального окна заказа -->
                        <button @click="isopenOrder = false"
                            class="absolute top-0 left-0 p-5 text-gray-500 hover:text-gray-700">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12">
                                </path>
                            </svg>
                        </button>

                        <h3 class="text-center text-xl font-semibold mb-4 pt-4">Личные данные</h3>

                        <div class="px-8 h-full overflow-y-auto">
                            <div class=" h-full overflow-y-auto">
                                <div class="text-center flex justify-center items-center h-full">Ваш номер заказа {{
                idorder }}</div>
                                <div class="fixed bottom-0 left-0 w-full p-4">
                                    <button @click=""
                                        class="w-full py-3 px-6 bg-pale-sky-800 dark:bg-pale-sky-50 dark:text-black text-white font-semibold rounded-xl hover:bg-pale-sky-700 dark:hover:bg-pale-sky-600 transition duration-200 animate__animated shadow-md shadow-gray-400 dark:shadow-pale-sky-700 hover:shadow-lg"
                                        :class="{ 'animate__fadeInUp': cartItems.length > 0, 'animate__fadeOutDown': cartItems.length === 0 }">
                                        <div class="flex flex-row justify-between">
                                            <div>40min</div>
                                            <div>Оформить заказ</div>
                                            <div>{{ totalPrice }}руб</div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>

            </div>
            <div v-if="selectedProduct" class="fixed z-10 inset-0 overflow-y-auto animate__animated animate__fadeIn">
                <div
                    class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 animate__animated animate__fadeIn ">
                    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div
                        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-center">
                                <div class="mt-3 sm:mt-0 sm:w-1/2 flex justify-center items-center">
                                    <img :src="'data:image/png;base64,' + selectedProduct.images" class="h-96" />
                                </div>
                                <div class="mt-3 sm:mt-0 sm:ml-6 sm:w-1/2">
                                    <div class="mb-4">
                                        <label for="title"
                                            class="block text-sm font-medium text-gray-700">Название</label>
                                        <input disabled type="text" id="title" v-model="selectedProduct.title"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    </div>
                                    <div class="mb-4">
                                        <label for="category"
                                            class="block text-sm font-medium text-gray-700">Категория</label>
                                        <select disabled id="category" v-model="selectedProduct.category"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option
                                                v-for="          category           in           categories.results          "
                                                :key="category.id" :value="category.id">{{ category.title }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="mb-4">
                                        <label for="price" class="block text-sm font-medium text-gray-700">Цена</label>
                                        <input disabled type="number" id="price" v-model.number="selectedProduct.price"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <!-- <button type="button" @click=""
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm ">
                                Добавить
                            </button> -->
                            <button type="button" @click="closeModal"
                                class="my-3 md:my-0 lg:my-0 xl:my-0 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



</template>

<script setup lang="ts">
import { API } from '~/plugins/axios.js';
import { ref } from 'vue';
import carditem from '../components/carditem.vue';
import { useCartStore } from '~/stores/cart';
import { storeToRefs } from 'pinia';



definePageMeta({
    layout: "default",
});


useHead({
    title: "Store", script: [
        {
            src: 'https://telegram.org/js/telegram-web-app.js',
            defer: true
        }
    ]
});

declare global {
    interface Window {
        Telegram: any; // Adjust the type as needed based on library usage
    }
}





interface Product_modal {
    id: number;
    title: string;
    price: number;
    category: number;
    images: string;
    quantity: number;
}

interface Product {
    count: number;
    results: {
        id: number;
        title: string;
        price: number;
        category: number;
        images: string;
        quantity: number;
    }[];
}

interface Category {
    count: number;
    results: {
        id: number;
        title: string;
    }[];
}

interface product_for_order {
    id: number,
    quantity: number
}

interface Order {
    customer_surname: string;
    customer_name: string;
    customer_lastname: string;
    customer_phone: string;
    customer_email: string;
    order_address: string;
    description: string;
}

interface CartItem {
    id: number;
    quantity: number;
}

const cartStore = useCartStore();
const { items: cartItems, totalItems, totalPrice } = storeToRefs(cartStore);
const selectedCategory = ref(0);

const loading = ref(true);
const filteredProducts = ref<Product['results']>([]);
const customer_order = ref<Order>({
    customer_surname: '',
    customer_name: '',
    customer_lastname: '',
    customer_phone: '',
    customer_email: '',
    order_address: '',
    description: ''
});

const selectedProduct = ref<Product_modal | null>(null);
const idorder = ref(0);
const isopenOrderModal = ref(false);
const isopenOrderCreditionalsModal = ref(false);
const isopenOrder = ref(false);
const userid = ref('');

// Check if running in a browser environment
if (typeof window !== 'undefined') {
    // Wait for DOMContentLoaded event
    window.addEventListener('DOMContentLoaded', () => {
        const tg = window.Telegram?.WebApp;
        if (tg) {
            userid.value = tg.initDataUnsafe.user.id;
            console.log(tg.initDataUnsafe.user.id);
        } else {
            console.error('Telegram is not defined');
        }
    });
} else {
    console.error('This script requires a browser environment.');
}

const toast = useToast();

const products = ref<Product>({
    count: 0,
    results: []
});

const categories = ref<Category>({
    count: 0,
    results: []
});

const options = [{
    value: 'BankCard',
    label: 'Банковская карта'
}, {
    value: 'Money',
    label: 'Наличными'
},]

const selected = ref('BankCard')

function get_data() {
    Promise.all([
        API.get('categories/'),
        API.get('products/')
    ])
        .then(function ([categoriesResponse, productsResponse]: any) {
            categories.value = categoriesResponse.data;
            products.value = productsResponse.data;

            if (categories.value.count > 0) {
                selectedCategory.value = categories.value.results[0].id;
                filterProducts();
            } else if (products.value.count > 0) {
                filteredProducts.value = products.value.results;
            }
            loading.value = false;

        })
        .catch(function (error: any) {
            console.log(error);
            loading.value = true;
        });
}

const createorder = async () => {
    const goodsData = cartItems.value.map((item) => ({
        id: item.id,
        quantity: item.quantity
    }));

    const order = {
        customer_surname: customer_order.value.customer_surname,
        customer_name: customer_order.value.customer_name,
        customer_lastname: customer_order.value.customer_lastname,
        customer_phone: customer_order.value.customer_phone,
        customer_email: customer_order.value.customer_email,
        order_address: customer_order.value.order_address,
        description: customer_order.value.description,
        status: "new",
        goods: goodsData
    };

    await API.post('orders/', order).then(
        (response) => {
            toast.add({
                title: "Заказ был успешно оформлен.",
                timeout: 1000,
                callback: () => {
                },
            });
            idorder.value = response.data;
            openOrder();
            get_data();
        }
    ).catch((error) => {
        toast.add({
            title: "Произошла ошибка. Заказ не был оформлен.",
            timeout: 1000,
            callback: () => {
                get_data();
            },
            color: "flamingo",
            ui: { background: "bg-white dark:bg-neutral-900" },
        });
        console.error('Error adding product:', error);
    });

}

function filterProducts() {
    if (selectedCategory.value === 0) {
        filteredProducts.value = products.value.results;
    } else {
        filteredProducts.value = products.value.results.filter(product =>
            product.category === selectedCategory.value
        );
    }
}

watch(selectedCategory, (newValue) => {
    if (newValue === 0) {
        filteredProducts.value = products.value.results;
    } else {
        filteredProducts.value = products.value.results.filter(product =>
            product.category === newValue
        );
    }
});

function openModal(product: Product_modal) {
    selectedProduct.value = { ...product };
}

function closeModal() {
    selectedProduct.value = null;
}

function addProductToCart() {
    toast.add({
        title: "Товар успешно добавлен.",
        timeout: 1000,
        callback: () => {
        },
    });
    // get_data();
}

function addToCart(product: Product_modal) {
    cartStore.addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        images: product.images
    });
}

function clearCart() {
    cartStore.clearCart();
    for (let i = 0; i < products.value.count; i++) {
        products.value.results[i].quantity = 0;
    }
}

function updateQuantityGood(product: Product_modal) {
    cartStore.updateItemQuantity(product.id, product.quantity);
}

function openOrderModal() {
    isopenOrderModal.value = true;
}
function openOrderCredetionalsModal() {
    isopenOrderCreditionalsModal.value = true;
}

function openOrder() {
    isopenOrder.value = true;
}


get_data();


</script>

<style>
body {
    font-family: 'Golos Text'
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>