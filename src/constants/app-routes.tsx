export const APP_ROUTES = {
  private: {
    dashboard: { name: '/dashboard' },
    cadastrar: { name: '/cadastrar-produto' },
    editar: { name: '/dashboard/editar-produto' },
    delete: { name: '/dashboard/deletar-produto' },
    menu: { name: '/dashboard/cardapio-do-dia' },
    AreaDeTestes: { name: '/teste' },
  },

  public: {
    home: '/',
    sacola: '/sacola',
    produto: '/produto/',
    buscar: '/buscar',
    login: '/login',
    refeicao: '/refeicoes',
    sobremesas: '/sobremesas',
    porcoes: '/porcoes',
    bebidas: '/bebidas',
    timeTables: '/horarios-de-funcionamento',
  },
}
