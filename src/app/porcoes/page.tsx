import RenderProducts from '@/components/render-products';

import styles from '../../styles/pages-styles.module.scss';

export default function Portions() {
  return (
    <main className={styles.main}>
      <h1>Porções</h1>
      <RenderProducts direction="horizontal" category="portions" />
    </main>
  );
}
