import Image from 'next/image'

import styles from '@/styles/dashboard.module.scss'

type ModalDeleteProps = {
  actionDeleteButton: () => void
  actionCancelButton: () => void
}

export const ModalDelete = ({
  actionDeleteButton,
  actionCancelButton,
}: ModalDeleteProps) => {
  return (
    <>
      <div className={styles.ilustration_modal_delete}>
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
      <button className={styles.delete} onClick={actionDeleteButton}>
        Excluir
      </button>
      <button className={styles.cancel} onClick={actionCancelButton}>
        Cancelar
      </button>
    </>
  )
}
