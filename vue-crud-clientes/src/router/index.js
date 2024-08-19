import { createRouter, createWebHistory } from 'vue-router';
import ClienteList from '../components/ClienteList.vue';
import ClienteForm from '../components/ClienteForm.vue';
import ProdutoList from '../components/ProdutoList.vue';
import ProdutoForm from '../components/ProdutoForm.vue';
import GrupoProdutoForm from '../components/GrupoProdutosForm.vue';
import GrupoProdutoList from '../components/GrupoProdutosList.vue';
import ItensVendasList from '../components/ItensVendasList.vue';
import ItensVendasForm from '../components/ItensVendasForm.vue';
import VendedoresList from '../components/VendedoresList.vue';
import VendedoresForm from '../components/VendedoresForm.vue';
import VendasList from '../components/VendasList.vue';
import VendasForm from '../components/VendasForm.vue';
// Importe os outros componentes de lista e formulário...

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/clientes'
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: ClienteList,
  },
  {
    path: '/clientes/novo',
    name: 'novo-cliente',
    component: ClienteForm,
  },
  {
    path: '/clientes/:id/editar',
    name: 'editar-cliente',
    component: ClienteForm,
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: ProdutoList,
  },
  {
    path: '/produtos/novo',
    name: 'novo-produto',
    component: ProdutoForm,
  },
  {
    path: '/produtos/:id/editar',
    name: 'editar-produto',
    component: ProdutoForm,
  },
  {
    path: '/grupoProdutos',
    name: 'grupo_produtos',
    component: GrupoProdutoList,
  },
  {
    path: '/grupoProdutos/novo',
    name: 'novo_grupo_produtos',
    component: GrupoProdutoForm,
  },
  {
    path: '/grupoProdutos/:id/editar',
    name: 'editar_grupo_produtos',
    component: GrupoProdutoForm,
  },
  {
    path: '/itensVendas',
    name: 'itens_vendas',
    component: ItensVendasList,
  },
  {
    path: '/itensVendas/novo',
    name: 'novo_itens_vendas',
    component: ItensVendasForm  ,
  },
  {
    path: '/itensVendas/:id/editar',
    name: 'editar_itens_vendas',
    component: ItensVendasForm  ,
  },
  {
    path: '/vendedor',
    name: 'vendedor',
    component: VendedoresList,
  },
  {
    path: '/vendedor/novo',
    name: 'novo_vendedor',
    component: VendedoresForm  ,
  },
  {
    path: '/vendedor/:id/editar',
    name: 'editar_vendedor',
    component: VendedoresForm  ,
  },
  {
  path: '/vendas',
  name: 'vendas',
  component: VendasList,
},
{
  path: '/vendas/novo',
  name: 'novo_venda',
  component: VendasForm  ,
},
{
  path: '/venda/:id/editar',
  name: 'editar_venda',
  component: VendasForm  ,
},
  // Adicione as rotas para os outros módulos da mesma forma...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
