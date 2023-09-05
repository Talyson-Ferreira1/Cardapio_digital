export function FormatCoin(numero: number) {
  const options = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return `${Number(numero).toLocaleString('pt-BR', options)}`;
}
