'use client';

import ButtonTag from './button';

import styles from '@/styles/navTags.module.scss';

interface tagProps {
  [tag: string]: {
    ilustration: string;
    name: string;
    pathName: string;
  };
}

export default function TagsHeader() {
  const tags: tagProps = {
    dessertsProps: {
      ilustration: '/ilustracoes/sobremesa.png',
      name: 'Sobremesas',
      pathName: '/sobremesas',
    },

    mealsProps: {
      ilustration: '/ilustracoes/refeicoes.png',
      name: 'Refeições',
      pathName: '/refeicoes',
    },

    drinksProps: {
      ilustration: '/ilustracoes/bebidas.png',
      name: 'Bebidas',
      pathName: '/bebidas',
    },

    portionProps: {
      ilustration: '/ilustracoes/porcoes.png',
      name: 'Porções',
      pathName: '/porcoes',
    },
  };

  return (
    <>
      <nav className={styles.container_tags}>
        <>
          {Object.keys(tags).map((tag, index) => {
            let currentTag = tags[tag];

            return (
              <ButtonTag
                key={index}
                ilustration={currentTag.ilustration}
                name={currentTag.name}
                pathName={currentTag.pathName}
              />
            );
          })}
        </>
      </nav>
    </>
  );
}
