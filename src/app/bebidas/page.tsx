import RenderProducts from '@/components/render-products';

import styles from '../../styles/pages-styles.module.scss';

export default function Drinks() {
  return (
    <main className={styles.main}>
      <h1>Bebidas</h1>
      <RenderProducts direction="horizontal" category="drinks" />
    </main>
  );
}
