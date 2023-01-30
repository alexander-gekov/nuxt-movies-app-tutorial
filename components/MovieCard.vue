<template>
    <div class="h-128 w-64 border flex flex-col text-center ">
        <NuxtLink :to="`movies/${movie.id}`" class="mb-5 bg-green-600 inline-block">
            <img class="transform hover:translate-x-6 hover:-translate-y-6 delay-50 duration-100 inline-block" :src="imgURL" alt="Movie Poster">
        </NuxtLink>
        <div class="text-lg">
            {{ movie.title }}
        </div>
        <p class="text-m text-gray-500 break-words text-wrap truncate overflow-hidden px-2">
            {{ movie.overview }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Movie } from '~/types/Movie';

const props = defineProps({
    movie: {
        type: Object as PropType<Movie>,
        required: true
    }
})

const config = useRuntimeConfig();
const imgURL = computed(() => props.movie.poster_path != null ? `${config.public.imgBaseUrl}/${props.movie.poster_path}` : 'https://via.placeholder.com/300x500');

</script>