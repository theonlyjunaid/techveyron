import React, { useState, useEffect } from 'react'
import { getCategories } from '../services'
import Link from 'next/link'

function Categories() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);
    return (
        <div className='bg-white shadow-lg p-8 mb-8 rounded-lg'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                Categories</h3>
            {
                categories.map((category) => (
                    <Link href={`/category/${category.slug}`} key={category.slug}>
                        <span className='cursor-pointer block mb-3 pb-3'>
                            {category.name}
                        </span>
                    </Link>
                ))
            }

        </div>
    )
}

export default Categories