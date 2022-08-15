import Head from 'next/head';
import { PostCard, Categories, PostWidget } from '../components';
import React from 'react';
import { FeaturedPosts } from '../sections/index';
import { getPosts } from '../services';


const Index = ({ posts }) => {
  return (
    <div className='container mx-auto px-10 mb-8'>
      <FeaturedPosts />
      <Head>
        <title>Tech Veyron</title>
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post, index) => {
            return (
              <PostCard post={post.node} key={post.node.title} />
            )
          })}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Index;

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts }
  }

}
