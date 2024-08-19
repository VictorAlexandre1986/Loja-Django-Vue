<template>
    <div>
      <h2>Produtos</h2>
      <button @click="novoProduto">Novo Produto</button>
      <ul>
        <li v-for="produto in produtos" :key="produto.id">
          {{ produto.nome }} - {{ produto.preco }} - {{ produto.grupo }}
          <button @click="editarProduto(produto.id)">Editar</button>
          <button @click="deletarProduto(produto.id)">Deletar</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import ProdutoService from '../services/ProdutoService';
  import { useRouter } from 'vue-router';
  
  const produtos = ref([]);
  const router = useRouter();
  
  const carregarProdutos = async () => {
    try {
      const response = await ProdutoService.getProdutos();
      console.log(response.data)
      produtos.value = response.data;
    } catch (error) {
      console.error("Erro ao carregar produtos", error);
    }
  };
  
  const novoProduto = () => {
    router.push({ name: 'novo-produto' });
  };
  
  const editarProduto = (id) => {
    router.push({ name: 'editar-produto', params: { id } });
  };
  
  const deletarProduto = async (id) => {
    try {
      await ProdutoService.deleteProduto(id);
      carregarProdutos();
    } catch (error) {
      console.error("Erro ao deletar produto", error);
    }
  };
  
  onMounted(() => {
    carregarProdutos();
  });
  </script>
  