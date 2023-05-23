import { ProductData } from '../types/products'
import data from '../assets/data.json'

type FetchDataReturn = {
  products: ProductData[]
}

const fetchData = new Promise<FetchDataReturn>((resolve, reject) => {
  try {
    setTimeout(() => {
      resolve({
        products: data as unknown as ProductData[]
      })
    }, 500)
  }
  catch (err) {
    reject(err);
  }
})

export const getProducts = async () => {
  try {
    const { products } = await fetchData
    return products
  }
  catch (err: any) {
    throw new Error(err)
  }
}
