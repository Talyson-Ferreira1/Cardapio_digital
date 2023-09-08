'use client'

export function Translate(category: string | boolean) {
  let translation = ''

  switch (category) {
    case 'meals':
      translation = 'Refeições'
      break

    case 'portions':
      translation = 'Porções'
      break

    case 'recommendation':
      translation = 'Recomendações'
      break

    case 'drinks':
      translation = 'Bebidas'
      break

    case 'desserts':
      translation = 'Sobremesas'
      break

    case true:
      translation = 'Sim'
      break

    case false:
      translation = 'Não'
      break

    default:
      break
  }

  return translation
}
