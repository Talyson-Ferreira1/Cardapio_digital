import { APP_ROUTES } from '@/constants/app-routes';

export const checkIsPublicRoute = (asPath: string) => {
  const appPublicRoute = Object.values(APP_ROUTES.public);
  let lettersOfPath = asPath.split('');
  let counter = 0;
  let newPath: Array<string> = [];

  lettersOfPath.map((letter) => {
    if (counter > 1) return;
    newPath.push(letter);
    if (letter === '/') counter++;
  });

  let path = newPath.join('');

  return appPublicRoute.includes(path);
};
