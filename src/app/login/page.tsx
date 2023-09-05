'use client'
import { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'

import checkIsUserAuthenticated from '@/functions/check-is-user-authenticated'
import * as Yup from 'yup'
import { LogIn, onAuthStateChange } from '@/services/authServices'
import { User } from 'firebase/auth'

import styles from '../../styles/login.module.scss'
import Image from 'next/image'

export default function Login() {
  const [user, setUser] = useState<User | null>()
  const [permissionDenied, setPermissionDenied] = useState(false)
  const router = useRouter()

  const FetchLoginUser = (data: any) => {
    LogIn(data.email, data.password)
      .then(() => {
        router.push('/dashboard')
        setPermissionDenied(false)
      })
      .catch((error) => {
        setPermissionDenied(true)
      })
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Digite um email válido')
      .required('Adicione um email válido'),
    password: Yup.string().required('A senha é obrigatória'),
  })

  useEffect(() => {
    function unSubscribe() {
      return onAuthStateChange((user) => {
        if (user) {
          setUser(user)
        } else {
          setUser(user)
        }
      })
    }

    unSubscribe()

    function UserAuthenticated() {
      let UserAuthenticated = checkIsUserAuthenticated()

      if (UserAuthenticated) {
        router.push('/dashboard')
      }
    }

    UserAuthenticated()
  }, [])

  return (
    <main className={styles.main}>
      <section>
        <Formik
          onSubmit={FetchLoginUser}
          validationSchema={validationSchema}
          initialValues={{
            email: '',
            password: '',
          }}
        >
          <Form className={styles.container}>
            <div className={styles.ilustration}>
              <Image
                src="/icons/login.svg"
                alt="login ilustration"
                width="100"
                height="100"
              />
            </div>

            {permissionDenied && (
              <span className={styles.error}>
                Você não tem permissão de acesso
              </span>
            )}
            <label htmlFor="email">Email:</label>
            <Field
              type="email"
              name="email"
              placeholder="Digite seu email"
              required
            ></Field>
            <ErrorMessage
              className={styles.error}
              name="email"
              component="div"
            />
            <label htmlFor="password">Senha:</label>
            <Field
              type="password"
              name="password"
              placeholder="Digite sua senha"
              required
            ></Field>
            <ErrorMessage
              className={styles.error}
              name="password"
              component="div"
            />
            <Field
              className={styles.submit}
              type="submit"
              value="Entrar"
            ></Field>
          </Form>
        </Formik>
      </section>
    </main>
  )
}
