import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductCard() {
    const param = useParams();

    const API = `https://dummyjson.com/products/${param.productId}`;

    const { data, isPending, mutate } = useMutation({
        mutationFn: updateTitle => {
            return axios.put(API, updateTitle);
        },
    });

    const fetchData = async () => {
        const fetchAPI = await fetch(API);
        const data = await fetchAPI.json();
        return data;
    };

    const {
        isLoading,
        error,
        isError,
        data: product,
    } = useQuery({
        queryKey: ['product', param.productId],
        queryFn: fetchData,
    });

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
        <>
            <div className='px-2 py-10'>
                <Link to='/products'> Back to Products</Link>
            </div>
            <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    mutate({ title: product.title + ' is updated' });
                }}>
                ProductCard : Update {product.title} - {isPending ? ' Updating through mutation..' : <b> {data?.data?.title} </b>}
            </div>

            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md '>
                <img src={product.thumbnail} alt={product.imageAlt} className='object-cover object-center' />
            </div>
        </>
    );
}

export default ProductCard;
