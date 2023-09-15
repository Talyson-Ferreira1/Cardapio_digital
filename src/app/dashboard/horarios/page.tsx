'use client'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import { fetchTimeTable, updateTimeTable } from '@/services/firebase/firestore'
import InputTable from '@/components/dashboard/input'
import SpinnerButton from '@/components/Loading/spinner'

import styles from '@/styles/dashboard.module.scss'
import 'react-toastify/dist/ReactToastify.css'

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

export default function Timetables() {
  const [definedTimeTables, setDefinedTimeTables] = useState({})
  const [changeTimeTables, setChangeTimeTables] = useState<boolean>(false)
  const [isLoading, setisLoading] = useState<boolean>(false)
  const notifySuccess = () => toast('Os horários foram redefinidos')
  const notifyError = () => toast('Erro ao redefinidos os horários')

  const handleSubmit = async (values: any) => {
    setisLoading(true)
    let result = await updateTimeTable(values)

    if (result === true) {
      setisLoading(false)
      notifySuccess()
    } else {
      notifyError()
      setisLoading(false)
    }
  }

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
    <main className={styles.container_timetables}>
      <div className="container-toast">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>

      <Formik initialValues={definedTimeTables} onSubmit={handleSubmit}>
        {(formikProps) => {
          return (
            <Form
              className={styles.form}
              onChange={() => setChangeTimeTables(true)}
            >
              <h1>Definir horários de funcionamento</h1>
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
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'segunda_abertura'}
                      />
                    </td>
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'segunda_fechamento'}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Terça-feira</td>
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'terca_abertura'}
                      />
                    </td>
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'terca_fechamento'}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Quarta-feira</td>
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'quarta_abertura'}
                      />
                    </td>
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'quarta_fechamento'}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Quinta-feira</td>
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'quinta_abertura'}
                      />
                    </td>
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'quinta_fechamento'}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Sexta-feira</td>
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'sexta_abertura'}
                      />
                    </td>
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'sexta_fechamento'}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Sábado</td>
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'sabado_abertura'}
                      />
                    </td>
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'sabado_fechamento'}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Domingo</td>
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'domingo_abertura'}
                      />
                    </td>
                    <td>
                      <InputTable
                        data={definedTimeTables}
                        formikProps={formikProps}
                        id={'domingo_fechamento'}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              {changeTimeTables && (
                <button type="submit">
                  {isLoading ? <SpinnerButton /> : 'Definir novos horário'}
                </button>
              )}
            </Form>
          )
        }}
      </Formik>
    </main>
  )
}
