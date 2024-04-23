<template>
    <div class="flex h-screen">
        <div class="grow h-screen overflow-y-auto p-4">
            <div v-if="loading" class="flex justify-center items-center h-full animate__animated animate__fadeIn">
                <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
            <div v-else>
                <div class="flex justify-between items-center">Ваши заказы</div>

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


const toast = useToast();
const loading = ref(true);
const route = useRoute()

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