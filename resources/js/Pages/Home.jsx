import React from 'react';
import Layout from '../Layouts/Layout'; 
import { Head } from '@inertiajs/react';

export default function Home({ auth, laravelVersion, phpVersion }) {
  return (
    <Layout auth={auth}>
      <Head title="Home" />
   <h1>Welcome to the fursaApp app home page</h1>
    </Layout>
  );
}
