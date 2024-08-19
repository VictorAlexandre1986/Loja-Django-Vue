<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <router-view />
    <nav>
    <router-link to="/clientes">| Clientes | </router-link>
    <router-link to="/produtos">Produtos | </router-link>
    <router-link to="/grupoProdutos">Grupos de Produtos | </router-link>
    <router-link to="/vendedor">Vendedores | </router-link>
    <router-link to="/vendas">Vendas | </router-link>
    <router-link to="/itensVendas">Itens de Venda | </router-link>
  </nav>
  
  
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
