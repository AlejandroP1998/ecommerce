import { useParams } from 'react-router-dom'
import callCollection from '../../Hooks/callCollection'
import { where } from 'firebase/firestore'
import ProductsList from './ProductsList/ProductsList'
import Loading from '../Loading/Loading'

const ItemContainer = () => {

    const { categoryId } = useParams()
    const item = () => {
        if (categoryId != 'ofertas') {
            return categoryId
        } else {
            return 'true'
        }


    }

    const texto = () => {
        if (categoryId != 'ofertas') {
            return 'category'
        } else {
            return 'oferta'
        }
    }

    const { data, loading } = callCollection(
        "localStore",
        [item()],
        item() && [
            where(texto(), "==", item())
        ]
    )

    return (
        <>
            {loading
                ? <Loading />
                : <ProductsList loading={loading} data={data} />
            }

        </>
    )
}

export default ItemContainer;