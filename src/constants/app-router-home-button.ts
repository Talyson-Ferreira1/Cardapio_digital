export const home_button_routes = {
  hasButton: {
    dashboard: '/dashboard',
    bebidas: '/bebidas',
    login: '/login',
    porcoes: '/porcoes',
    refeicoes: '/refeicoes',
    sobremesas: '/sobremesas',
    timeTables: '/horarios-de-funcionamento',
  },

  noButton: {
    home: '/',
    sacola: '/sacola',
    produto: '/produto',
    buscar: '/buscar',
    cadastrar: { name: '/cadastrar-produto' },
    editarProduto: { name: '/editar-produto/' },
    editar: { name: '/editar-produto' },
    delete: { name: '/deletar-produto' },
    menu: { name: '/cardapio-do-dia' },
  },
}
