<template>
    <div class="flex h-screen">
        <div class="grow h-screen overflow-y-auto px-4">
            <div v-if="loading" class="flex justify-center items-center h-full animate__animated animate__fadeIn">
                <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
            <div v-else>
                <h3 class="text-center text-2xl font-semibold py-4 rounded-md absolute top-0 left-0 w-full bg-white">
                    Ваши
                    заказы
                </h3>
                <div class="pb-16"></div>

                <div class="flex flex-col text-lg font-bold" v-for="order in orders.results">
                    <a class="flex flex-row justify-between text-black rounded-lg p-3 my-1 shadow-lg"
                        :class="{ 'bg-slate-600': order.status === 'new', 'bg-mountain-600': order.status === 'done', 'bg-yellow-300': order.status === 'in_progress', 'bg-red-600': order.status === 'cancelled' }"
                        @click.prevent="openModal(order)">
                        <div>{{ order.id }}</div>
                        <div>{{ order.status }}</div>
                    </a>

                </div>
            </div>
        </div>
    </div>
    <div v-if="selectedOrder" class="fixed z-10 inset-0">
        <div class="flex items-center justify-center min-h-screen px-4 text-center sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                <div class="bg-white px-4 sm:p-6 ">
                    <div class="">
                        <div class="mt-3 sm:mt-0 sm:w-full">
                            <div class="flex justify-between">
                                <h3 class="text-2xl text-center w-full mb-3 text-gray-700">Заказ №{{ selectedOrder.id }}
                                </h3>

                            </div>

                            <div class="mb-4">
                                <label for="category" class="block text-md font-medium text-gray-700">Статус</label>
                                <select disabled id="category" v-model="selectedOrder.status"
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out">
                                    <option disabled value="">Select a status</option>
                                    <option v-for="column in columns" :key="column.status" :value="column.status"
                                        :selected="column.status === selectedOrder.status">{{ column.title }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-4" style="max-height: 200px; overflow-y: auto;">
                                <span class="block text-md font-medium text-gray-700">Товары</span>
                                <div class="p-2 rounded shadow-sm border-gray-100 border-2">
                                    <ul>
                                        <li v-for="(item, index) in selectedOrder.goods" :key="index"
                                            class="flex justify-between py-2 border-b">
                                            <div>
                                                <span class="font-medium">{{ item.title }}</span>
                                                <span class="text-gray-500 text-sm ml-2">{{ item.price }} ₽</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex ">
                    <button type="button" @click="closeModal"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>



</template>

<script setup lang="ts">
import { API } from '~/plugins/axios.js';
import { ref } from 'vue';
import carditem from '../../components/carditem.vue';
import { useCartStore } from '~/stores/cart';
import { storeToRefs } from 'pinia';

definePageMeta({
    layout: "default",
});

useHead({
    title: "Orders"
});

interface Order {
    count: number;
    results: {
        id: number;
        customer_name: string;
        customer_phone: string;
        customer_email: string;
        status: string;
        description: string;
        goods: {
            id: number;
            title: string;
            category: number;
            price: number;
        }[];
    }[];
}

interface Order_modal {

    id: number;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    status: string;
    description: string;
    goods: {
        id: number;
        title: string;
        category: number;
        price: number;
    }[];
}

const toast = useToast();
const loading = ref(false);
const route = useRoute();
const selectedOrder = ref<Order_modal | null>(null);
const isopenOrder = ref(false);
const columns = [
    { title: "Новые", status: "new" },
    { title: "В процессе", status: "in_progress" },
    { title: "Готово", status: "done" },
    { title: "Отменено", status: "cancelled" },
];


API.get('orders/' + route.params.id + '/')
    .then(function (response: any) {
        orders.value = response.data;
        console.log(orders);
        loading.value = false;
    })
    .catch(function (error: any) {
        console.log(error);
    });

const orders = ref<Order>({
    count: 0,
    results: []
});

function openModal(order: Order_modal) {
    selectedOrder.value = { ...order };
    isopenOrder.value = true;
}

function closeModal() {
    selectedOrder.value = null;
    isopenOrder.value = false;
}


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