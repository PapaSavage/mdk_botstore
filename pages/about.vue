<template>
    <div class="flex h-screen">
        <div class="grow h-screen overflow-y-auto px-4">

        </div>
    </div>



</template>

<script setup lang="ts">
import { API } from '~/plugins/axios.js';
import { ref } from 'vue';
import { useCartStore } from '~/stores/cart';
import { storeToRefs } from 'pinia';

definePageMeta({
    layout: "default",
});

useHead({
    title: "Orders"
});


</script>