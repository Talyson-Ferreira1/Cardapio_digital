'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import * as Yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { app } from '@/services/exportFirebase'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore'

import { ToastContainer, toast } from 'react-toastify'
import { GenerateRandomId } from '@/functions/generate-random-id'

import styles from '../../styles/cadastrar.module.scss'
import 'react-toastify/dist/ReactToastify.css'

interface DataImage {
  image: string
  type: string
}

export default function CadastrarProduto() {
  const [domLoaded, setDomLoaded] = useState(false)
  const [imagePreview, setImagePreview] = useState<DataImage>()
  const [existImage, setExistImage] = useState<boolean>(false)
  const [image, setImage] = useState<any>({})
  const notifySucess = () => toast('Produto cadastrado')
  const notifyError = () => toast('Erro ao cadastrar')

  const SendProductToDB = async (values: any) => {
    const db = getFirestore(app)
    const storage = getStorage(app)
    const SendProductCollection = collection(db, 'Products')

    try {
      const newValues = {
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
        id: GenerateRandomId(),
        available: true,
        stars: 5,
        order_only: false,
        daily_menu: false,
        weight: 0,
      }

      const docRef = doc(SendProductCollection, `${newValues.id}`)
      const storageRef = ref(storage, `Image_Products/${newValues.id}`)
      const imageBlob = new Blob([image.target.files[0] as File], {
        type: image.target.files[0].type,
      })

      const imageRef = ref(storageRef, `imagem.jpg`)
      await uploadBytes(imageRef, imageBlob)

      await setDoc(docRef, newValues)

      console.log('Cadastrado')
      notifySucess()
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error)
      notifyError()
    }
  }

  const resetPreview = () => {
    setExistImage(false)
    setImage({})
    setImagePreview({
      image: '',
      type: '',
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setImage(e)
      setExistImage(true)

      setImagePreview({
        image: URL.createObjectURL(file),
        type: file.type,
      })
    }
  }

  const validationSchema = Yup.object({
    image: Yup.mixed().required('Adicione uma imagem'),
    name: Yup.string()
      .required('O nome é obrigatório')
      .max(50, 'Deve ter máximo 50 caracteres'),
    description: Yup.string()
      .required('A descrição é obrigatório')
      .max(100, 'Deve ter máximo 100 caracteres'),
    height: Yup.number(),
    price: Yup.number().required('O valor é obrigatório'),
    category: Yup.string().required('Selecione uma categoria'),
  })

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  return (
    <>
      {domLoaded && (
        <section className={styles.container}>
          <Formik
            onSubmit={(values, formikBag) => {
              SendProductToDB(values)
              formikBag.resetForm()
              resetPreview()
            }}
            validationSchema={validationSchema}
            initialValues={{
              image: '',
              name: '',
              description: '',
              category: '',
              price: '',
              weight: 0,
            }}
          >
            <Form className={styles.form}>
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

              <label
                htmlFor="image"
                className={styles.image_product}
                title="Insira uma imagem para o produto"
              >
                <Field
                  className={styles.image}
                  type="file"
                  name="image"
                  accept=".jpg, .jpeg, .png, .webp"
                  onBlur={handleImageChange}
                />
                {existImage && imagePreview ? (
                  <div className={styles.image_uploaded}>
                    <img src={imagePreview.image} alt="Uploaded product" />
                  </div>
                ) : (
                  <div>
                    <Image
                      src="/icons/upload.svg"
                      alt="Upload image"
                      layout="intrinsic"
                      width="30"
                      height="30"
                    />
                    <h3>Carregue uma imagem</h3>
                  </div>
                )}
              </label>
              <ErrorMessage
                className={styles.error}
                name="image"
                component="div"
              />

              <Field
                as="select"
                name="category"
                className={styles.category_product}
              >
                <option value="" disabled>
                  Selecione a categoria
                </option>
                <option value="portions">Porções</option>
                <option value="recommendation">Recomendações</option>
                <option value="meals">Refeições Prontas</option>
                <option value="drinks">Bebidas</option>
                <option value="desserts">Sobremesas</option>
              </Field>
              <ErrorMessage
                className={styles.error}
                name="category"
                component="div"
              />

              <label
                htmlFor="name"
                className={styles.name_product}
                title="Insira um nome para o produto"
              >
                <Field
                  className={styles.input}
                  type="text"
                  name="name"
                  required
                />
                <span>Nome do produto</span>
              </label>
              <ErrorMessage
                className={styles.error}
                name="name"
                component="div"
              />

              <label
                htmlFor="description"
                className={styles.description_product}
                title="Insira uma descrição para o produto"
              >
                <Field
                  className={styles.input}
                  type="textArea"
                  name="description"
                  required
                />
                <span>Descrição do produto</span>
              </label>
              <ErrorMessage
                className={styles.error}
                name="description"
                component="div"
              />

              <label
                htmlFor="height"
                className={styles.height_product}
                title="Insira o peso."
              >
                <Field
                  className={styles.input}
                  min="0"
                  step="0.01"
                  type="number"
                  pattern="[0-9]*"
                  name="height"
                  required
                />
                <span>
                  Peso do produto <small>Ex: 300</small>
                </span>
              </label>
              <ErrorMessage
                className={styles.error}
                name="height"
                component="div"
              />

              <label
                htmlFor="price"
                className={styles.price_product}
                title="Insira um preço para o produto"
              >
                <Field
                  className={styles.input}
                  min="0"
                  step="0.01"
                  type="number"
                  pattern="[0-9]*"
                  name="price"
                  required
                />
                <span>
                  Preço do produto <small>Ex: 10.00</small>
                </span>
              </label>
              <ErrorMessage
                className={styles.error}
                name="price"
                component="div"
              />

              <button className={styles.submit} type="submit">
                Cadastrar produto
              </button>
            </Form>
          </Formik>
        </section>
      )}
    </>
  )
}
