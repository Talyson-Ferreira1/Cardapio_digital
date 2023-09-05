import RenderProducts from '@/components/render-products';

import styles from '../../styles/pages-styles.module.scss';

export default function Desserts() {
  return (
    <main className={styles.main}>
      <h1>Sobremesas</h1>
      <RenderProducts direction="horizontal" category="desserts" />
    </main>
  );
}
