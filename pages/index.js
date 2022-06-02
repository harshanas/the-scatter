import react, { useContext, useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head';
import Image from 'next/image';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import AccountConnection from '../components/AccountConnection'
import MainLayout from '../layouts/mainLayout'
import { AccountContext }  from "../lib/context";
import config from "../scatter.config";

import styles from '../assets/styles/Home.module.css'
import ScatterLogo from "../public/images/logo_home.png"

export default function Home() {
  const { walletAddr } = useContext(AccountContext);
  const [ storiesCount, setStoriesCount ] = useState(0);
  const [ authorsCount, setAuthorsCount ] = useState(0);

  useEffect(() => {
    const client = new ApolloClient({
      uri: config.SUBGRAPH_API,
      cache: new InMemoryCache(),
    });

    const tokensQuery = `query {
        stories{
          id,
          author
        }
    }`;

    client.query({query: gql(tokensQuery)})
          .then((queryResult) => {
            const stories = queryResult.data.stories;
            const authors = stories.map((story) => story.author);
            const uniqueAuthors = authors.filter((author, index, arr) => 
              arr.indexOf(author) == index
            );
            setStoriesCount(stories.length);
            setAuthorsCount(uniqueAuthors.length);
          })
          .catch((err) => {
            console.log('Error fetching data: ', err)
          })

    
  }, [])

  return (
    <react.Fragment>
      <Head>
        <title>The Scatter - The on-chain blog</title>
        <meta name="description" content="The on-chain blog" />
      </Head>
    
      <main className="d-flex h-100 text-center text-dark bg-white">
        <div className={`${styles['container']} d-flex  p-3 mx-auto flex-column`}>
          <header className="mb-auto">
            {/* <div>
              <h3 className="float-md-start mb-0">The Scatter</h3>
              <nav className={`nav ${styles['nav-masthead']} justify-content-center float-md-end`}>
                
              </nav>
            </div> */}
          </header>

          <main className="px-1">
            <Image className="img-responsive" src={ScatterLogo} />
            <h5 className='text-muted'>The on-chain Blog</h5>
            <p className="lead mb-4">
              The Scatter is a blogging platform created inside the Polygon network.<br/>You can connect your wallet and publish posts.<br/>Happy Writing :) 
            </p>
            <p className="lead">
              {
                walletAddr ? (
                  <Link href={`/${walletAddr}/stories/`}>
                    <button type="button" className="btn btn-secondary">
                        Go to Dashboard
                    </button>
                  </Link>
                ) : (
                  <AccountConnection redirPath="home" />
                )
              }
              
            </p>
          </main>
          
          <div className="row mt-5">
            <h4>Stats</h4>
            <hr/>
            <div className="col">
              <div>
                <h4 className="fw-bold mb-0">{ authorsCount} </h4>
                <p>Authors</p>
              </div>
            </div>

            <div className="col">
              <div>
                <h4 className="fw-bold mb-0">{ storiesCount}</h4>
                <p>Stories</p>
              </div>
            </div>
          </div>

          <div className="row">
            <h4>Open for Contribution</h4>
            <hr/>
            <div className='col-12'>
              <a className='nav-link' href="https://github.com/harshanas/the-scatter">
                <i className='fa-brands fa-github fa-3x'></i>
              </a>
            </div>
          </div>

          <footer className="mt-auto text-white-50">
            
          </footer>
        </div>
      </main>

    </react.Fragment>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}