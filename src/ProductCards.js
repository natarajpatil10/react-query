import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const API = 'https://dummyjson.com/products?limit=8';
// const API = 'https://dummyjson.com/products/search?q=Laptop&limit=8';

export default function ProductCards({}) {
    const fetchData = async () => {
        const fetchAPI = await fetch(API);
        const data = await fetchAPI.json();
        return data.products;
    };

    const {
        isLoading,
        error,
        isError,
        data: products,
    } = useQuery({
        queryKey: ['products'],
        queryFn: fetchData,
        // staleTime: 10000, // you can it queryClient obj globally
    });
        console.log(`error -->`, error, error.message);

    if (isLoading) {
        return (
            <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', color: 'darkgray' }}>Loading..</h1>
            </div>
        );
    }

    if (isError) {
        return (
            <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', color: 'darkgray' }}>{error.message}</h1>
            </div>
        );
    }

    return (
        <div className='bg-white'>
            <div className='px-2 py-10'>
                <Link to='/'> Home </Link>
            </div>
            <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
                <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Customers also purchased</h2>

                <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                    {products?.map(product => (
                        <div key={product.id} className='group relative'>
                            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                                <img src={product.thumbnail} alt={product.imageAlt} className='h-full w-full object-cover object-center lg:h-full lg:w-full' />
                            </div>
                            <div className='mt-4 flex justify-between'>
                                <div>
                                    <h3 className='text-sm text-gray-700'>
                                        <Link to={`/products/${product.id}`}>
                                            <span aria-hidden='true' className='absolute inset-0' />
                                            {product.title}
                                        </Link>
                                    </h3>
                                    <p className='mt-1 text-sm text-gray-500'>{product.category}</p>
                                </div>
                                <p className='text-sm font-medium text-gray-900'>{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
