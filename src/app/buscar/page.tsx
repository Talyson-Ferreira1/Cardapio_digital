'use client'
import { SearchContext } from '@/context/user'
import { useContext } from 'react'

export default function Search() {
  const { productName } = useContext(SearchContext)

  console.log(productName)

  return <h1>Buscar</h1>
}
