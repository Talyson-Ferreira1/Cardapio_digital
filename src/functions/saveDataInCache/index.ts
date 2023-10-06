interface propsSaveData {
  keyName: string
  productId: string
  data: string | object | number
}

export function saveDataInCache({ keyName, data, productId }: propsSaveData) {
  let alreadyExistThekey = localStorage.getItem(keyName)

  if (alreadyExistThekey && alreadyExistThekey != null) {
    let newData = { ...JSON.parse(alreadyExistThekey) }

    newData[productId] = data

    localStorage.setItem(keyName, JSON.stringify(newData))
  } else {
    let newData = {
      [productId]: data,
    }

    localStorage.setItem(keyName, JSON.stringify(newData))
  }
}
