import "../css/style.css";
import "../css/form.css";

import Head from "next/head";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Collections</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/collection/new">
            <a>New Collection</a>
          </Link>
          <Link href="/image/new">
            <a>New Image</a>
          </Link>
        </div>
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
