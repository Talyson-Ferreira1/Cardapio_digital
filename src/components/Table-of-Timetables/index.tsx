import { useState } from 'react'

import styles from '@/styles/dashboard.module.scss'

interface Hours {
  abertura: string
  fechamento: string
  diasDaSemana: {
    segunda: boolean
    terca: boolean
    quarta: boolean
    quinta: boolean
    sexta: boolean
    sabado: boolean
    domingo: boolean
  }
}

export default function Table() {
  const [definedTimeTables, setDefinedTimeTables] = useState<Hours>({
    abertura: '18:00',
    fechamento: '23:00',
    diasDaSemana: {
      segunda: false,
      terca: false,
      quarta: false,
      quinta: false,
      sexta: false,
      sabado: false,
      domingo: false,
    },
  })

  return (
    <section className={styles.table}>
      <h2 className={styles.text_table}>
        {`Horário de funcionamento atual: ${definedTimeTables.abertura} às ${definedTimeTables.fechamento}`}
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
              <td>09:00</td>
              <td>18:00</td>
            </tr>
            <tr>
              <td>Terça-feira</td>
              <td>09:00</td>
              <td>18:00</td>
            </tr>
            <tr>
              <td>Quarta-feira</td>
              <td>09:00</td>
              <td>18:00</td>
            </tr>
            <tr>
              <td>Quinta-feira</td>
              <td>09:00</td>
              <td>18:00</td>
            </tr>
            <tr>
              <td>Sexta-feira</td>
              <td>09:00</td>
              <td>18:00</td>
            </tr>
            <tr>
              <td>Sábado</td>
              <td>10:00</td>
              <td>15:00</td>
            </tr>
            <tr>
              <td>Domingo</td>
              <td>Fechado</td>
              <td>Fechado</td>
            </tr>
          </tbody>
        </table>
      </h2>
    </section>
  )
}
