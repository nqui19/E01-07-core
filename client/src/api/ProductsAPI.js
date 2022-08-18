import {useState,useEffect} from 'react'
import axios from 'axios'
function ProductsAPI() {
    const [products,setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [sort, setSort] = useState('')
    const [category, setCategory] = useState('')
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [result, setResult] = useState(0)
    useEffect(() => {
        const getProducts = async () => {
            console.log(category)
            const res = await axios.get(`/api/products?limit=${page*30}&${category}&${sort}`)
            
            setProducts(res.data.products)
            setResult(res.data.result)
        }

        getProducts()
        
    },[callback,sort,category,search,page])
    return {
        products: [products,setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
        sort: [sort, setSort],
    }
}
export default ProductsAPI