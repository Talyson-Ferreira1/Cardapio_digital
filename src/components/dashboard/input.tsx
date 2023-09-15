import { Field } from 'formik'
import styles from '@/styles/dashboard.module.scss'
import { useEffect, useState } from 'react'

type InputProps = {
  id: string
  formikProps: any
  data: any
}

export default function InputTable({ formikProps, id, data }: InputProps) {
  const [selected, setSelected] = useState()

  useEffect(() => {
    if (data) {
      let value = data[id]
      setSelected(value)
      console.log(value)
    }
  }, [data])

  function generateHorarios() {
    const horarios = []
    const horaInicial = 0
    const intervaloMinutos = 30
    const minutosPorDia = 24 * 60

    for (
      let minutos = horaInicial;
      minutos < minutosPorDia;
      minutos += intervaloMinutos
    ) {
      const hora = Math.floor(minutos / 60)
        .toString()
        .padStart(2, '0')
      const minuto = (minutos % 60).toString().padStart(2, '0')
      const horario = `${hora}:${minuto}`
      horarios.push(
        <option
          selected={selected === horario}
          key={horario}
          value={horario}
          className={styles.option}
        >
          {horario}
        </option>,
      )
    }

    return horarios
  }

  return (
    <>
      <Field
        as="select"
        id={`${id}`}
        name={`${id}`}
        select={`${selected}`}
        value={`${selected}`}
        className={styles.horario_product}
        {...formikProps.getFieldProps(`${id}`)}
      >
        {generateHorarios()}
        <option
          selected={selected === 'Fechado'}
          value="Fechado"
          className={styles.option}
        >
          Fechado
        </option>
      </Field>
    </>
  )
}
