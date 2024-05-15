import Layout from '@/Layouts/Layout';
import React from 'react';

function About({ auth }) { 
  return (
    <Layout auth={auth}>
      This is the about page
    </Layout>
  );
}

export default About;
