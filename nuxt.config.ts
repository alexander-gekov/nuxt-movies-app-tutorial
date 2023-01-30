// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
    'nuxt-windicss',
    '@vueuse/nuxt'
  ],
  runtimeConfig: {
    apiKey: '',
    apiBaseUrl: '',
    // We use the public runtime config in 
    //order to expose this also to the client side
    public: {
        imgBaseUrl: '',
    }
  }
})
