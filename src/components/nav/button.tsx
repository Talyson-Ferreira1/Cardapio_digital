'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

import styles from '../../styles/navTags.module.scss';

interface componentProps {
  ilustration: string;
  name: string;
  pathName: string;
}

export default function ButtonTag({
  ilustration,
  name,
  pathName,
}: componentProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const route = useRouter();
  const pathNamePage = usePathname();

  const handleClick = () => {
    setIsLoading(true);
    route.push(pathName);
  };

  useEffect(() => {
    if (pathNamePage === pathName) {
      setIsLoading(false);
    }
  }, [pathNamePage]);

  return (
    <button onClick={handleClick} className={styles.tag_button}>
      {isLoading ? (
        <div className={styles.container_loader_tags}>
          <div>
            <Image
              src="/ilustracoes/loader.png"
              alt="ilustration"
              width="20"
              height="20"
              priority
            />
          </div>
        </div>
      ) : (
        <Image
          src={ilustration}
          alt="ilustration"
          width="20"
          height="20"
          priority
        />
      )}

      <>{name}</>
    </button>
  );
}
