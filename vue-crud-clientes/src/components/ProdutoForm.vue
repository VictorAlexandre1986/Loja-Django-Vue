<template>
    <div>
      <h2>{{ isEditing ? 'Editar Produto' : 'Novo Produto' }}</h2>
      <form @submit.prevent="salvarProduto">
        <div>
          <label for="nome">Nome</label>
          <input v-model="produto.nome" id="nome" required />
        </div>
        <div>
          <label for="preco">Preço</label>
          <input v-model="produto.preco" id="preco" required />
        </div>
        <div>
          <label for="preco">Grupo</label>
          <input v-model="produto.grupo" id="grupo" required />
        </div>
        <button type="submit">Salvar</button>
        <button @click="voltar">Cancelar</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import ProdutoService from '../services/ProdutoService';
  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  const produto = ref({ nome: '', preco: '', grupo: '' });
  const isEditing = ref(false);
  
  const carregarProduto = async () => {
    if (route.params.id) {
      isEditing.value = true;
      try {
        const response = await ProdutoService.getProduto(route.params.id);
        produto.value = response.data;
      } catch (error) {
        console.error("Erro ao carregar produto", error);
      }
    }
  };
  
  const salvarProduto = async () => {
    try {
      if (isEditing.value) {
        await ProdutoService.updateProduto(route.params.id, produto.value);
      } else {
        await ProdutoService.createProduto(produto.value);
      }
      router.push({ name: 'produtos' });
    } catch (error) {
      console.error("Erro ao salvar produto", error);
    }
  };
  
  const voltar = () => {
    router.push({ name: 'produtos' });
  };
  
  onMounted(() => {
    carregarProduto();
  });
  </script>
  