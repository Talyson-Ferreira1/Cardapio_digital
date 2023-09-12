'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'

import { LogIn, onAuthStateChange } from '@/services/firebase/auth'
import { User } from 'firebase/auth'
import SpinnerButton from '@/components/Loading/spinner'
import checkIsUserAuthenticated from '@/services/firebase/auth'

import styles from '@/styles/login.module.scss'
interface valuesFormik {
  email: string
  password: string
}

export default function Login() {
  const [user, setUser] = useState<User | null>()
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [spinner, setSpinner] = useState<boolean>(false)
  const router = useRouter()

  const FetchLoginUser = ({ email, password }: valuesFormik) => {
    setSpinner(true)

    LogIn(email, password)
      .then(() => {
        router.push('/dashboard')
        setPermissionDenied(false)
      })
      .catch((error) => {
        console.log(error)
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

  useEffect(() => {
    if (permissionDenied) {
      setTimeout(() => {
        setPermissionDenied(false)
      }, 2000)
    }

    setSpinner(false)
  }, [permissionDenied])

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
              <p className={styles.warning}>
                Você não tem permissão de acesso.
              </p>
            )}
            <label htmlFor="email">
              Email:
              <Field
                type="email"
                name="email"
                placeholder="Digite seu email"
                required
              />
            </label>
            <ErrorMessage
              className={styles.error}
              name="email"
              component="span"
            />

            <label htmlFor="password">
              Senha:
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Digite sua senha"
                required
              />
              {
                <div
                  className={styles.show_password}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Image
                      src="/icons/eye-closed.svg"
                      alt="show password"
                      width="20"
                      height="20"
                    />
                  ) : (
                    <Image
                      src="/icons/eye-open.svg"
                      alt="show password"
                      width="20"
                      height="20"
                    />
                  )}
                </div>
              }
            </label>
            <ErrorMessage
              className={styles.error}
              name="password"
              component="span"
            />
            <button className={styles.submit} type="submit">
              {!spinner ? 'Entrar' : <SpinnerButton />}
            </button>
          </Form>
        </Formik>
      </section>
    </main>
  )
}
