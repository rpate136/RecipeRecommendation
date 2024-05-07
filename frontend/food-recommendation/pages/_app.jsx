// pages/_app.js

import "/src/app/globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer"
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps }) {
  return (
    <div data-theme='cupcake'>
    <div className="flex flex-col h-full md:h-screen w-full">
      <Navbar />
      <div className="mx-auto max-w-8xl md:m-2 text-2xl flex-grow mb-auto flex flex-col justify-between min-h-screen">
      <Component {...pageProps} />
      </div>
    </div>
      <Footer></Footer>
    </div>
  );
}

export default MyApp;
