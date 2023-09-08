import { DeleteProductInDb } from '@/functions/functions-with-db/delete-product'
import styles from '@/styles/dashboard.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface props {
  close: () => void
  productId: string
}

export default function Modal({ close, productId }: props) {
  const route = useRouter()

  const hancleClick = () => {
    DeleteProductInDb({ id: productId })
    close()
    route.refresh()

    //fazer uma nova requisição para atualizar os produtos
  }

  return (
    <div className={styles.container_modal}>
      <div className={styles.modal}>
        <button className={styles.close_modal} onClick={close}>
          X
        </button>

        <div className={styles.ilustration}>
          <Image
            src="/icons/warning.svg"
            alt="warning ilustration"
            width="30"
            height="30"
          />
        </div>

        <h2> Excluir Produto</h2>
        <p>
          Você tem certeza que deseja excluir esse produto?
          <br /> Não será possivel desfazer essa ação
        </p>
        <button className={styles.delete} onClick={hancleClick}>
          Excluir
        </button>
        <button className={styles.cancel} onClick={close}>
          Cancelar
        </button>
      </div>
    </div>
  )
}
