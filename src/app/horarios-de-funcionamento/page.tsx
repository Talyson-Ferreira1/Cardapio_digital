'use client'
import { fetchTimeTable } from '@/services/firebase/firestore'
import { useEffect, useState } from 'react'

interface AllHours {
  segunda_abertura: string
  segunda_fechamento: string

  terca_abertura: string
  terca_fechamento: string

  quarta_abertura: string
  quarta_fechamento: string

  quinta_abertura: string
  quinta_fechamento: string

  sexta_abertura: string
  sexta_fechamento: string

  sabado_abertura: string
  sabado_fechamento: string

  domingo_abertura: string
  domingo_fechamento: string
}

export default function WarningPage() {
  const [definedTimeTables, setDefinedTimeTables] = useState<any>({})

  const getTimeTableInDB = async () => {
    let timetable = await fetchTimeTable()

    if (timetable != undefined) {
      setDefinedTimeTables(timetable)
    }
  }

  useEffect(() => {
    getTimeTableInDB()
  }, [])
  return (
    <>
      <h1>Infelizmente estamos fechado no momento.</h1>

      <h2>Horários de funcionamento:</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Dia da Semana</th>
            <th>Abertura</th>
            <th>Fechamento</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Segunda-feira</td>
            <td>{definedTimeTables?.segunda_abertura}</td>
            <td>{definedTimeTables?.segunda_fechamento}</td>
          </tr>
          <tr>
            <td>Terça-feira</td>
            <td>{definedTimeTables?.terca_abertura}</td>
            <td>{definedTimeTables?.terca_fechamento}</td>
          </tr>
          <tr>
            <td>Quarta-feira</td>
            <td>{definedTimeTables?.quarta_abertura}</td>
            <td>{definedTimeTables?.quarta_fechamento}</td>
          </tr>
          <tr>
            <td>Quinta-feira</td>
            <td>{definedTimeTables?.quinta_abertura}</td>
            <td>{definedTimeTables?.quinta_fechamento}</td>
          </tr>
          <tr>
            <td>Sexta-feira</td>
            <td>{definedTimeTables?.sexta_abertura}</td>
            <td>{definedTimeTables?.sexta_fechamento}</td>
          </tr>
          <tr>
            <td>Sábado</td>
            <td>{definedTimeTables?.sabado_abertura}</td>
            <td>{definedTimeTables?.sabado_fechamento}</td>
          </tr>
          <tr>
            <td>Domingo</td>
            <td>{definedTimeTables?.domingo_abertura}</td>
            <td>{definedTimeTables?.domingo_fechamento}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
