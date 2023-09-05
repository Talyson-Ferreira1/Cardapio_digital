import RenderProducts from '@/components/render-products';
import styles from '@/styles/pages-styles.module.scss';

export default function Meals() {
  return (
    <main className={styles.main}>
      <h1>Refeições</h1>

      <RenderProducts direction="horizontal" category="meals" />
    </main>
  );
}
