<template>
    <div class="flex flex-col px-20 mt-10">
        <div class="grid grid-cols-7 gap-1">
            <img class="col-span-2" :src="imgUrl" alt="Movie Poster">
            <div class="flex flex-col col-span-3">
                <div class="text-4xl font-sans font-bold mb-5">" {{ data?.title }} "</div>
                <div class="flex">
                    <div class="px-4 py-2 bg-gray-200 text-gray-800 rounded-full mr-2 mb-2" v-for="genre in data?.genres">{{ genre.name }}</div>
                </div>
                <div class="text-lg my-2 ">Release Date: {{ data?.release_date }}</div>
                <div class="text-lg mb-2 ">Duration: {{ data?.runtime }} mins</div>
                <p class="text-gray-600 text-m">{{ data?.overview }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { Movie } from '~/types/Movie';

const route = useRoute();
const movieId = computed(() => route.params.id);

const { data } = await useFetch<Movie>(`/api/movies/${movieId.value}`);

const imgUrl = usePosterPath(data.value?.poster_path);

const releaseDate = data.value?.release_date ? useDateFormat(new Date(data.value?.release_date ?? ''), 'YYYY-MM-DD').value : 'Unknown date';
</script>
