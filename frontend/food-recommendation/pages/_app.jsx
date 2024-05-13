// pages/_app.js

import "/src/app/globals.css";
import Navbar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer"



function MyApp({ Component, pageProps }) {

  return (
    <div >
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <div className="flex-1 ml-auto mr-auto mt-0 justify-between min-h-screen">
      <Component {...pageProps} />
      </div>
    </div>
      <Footer></Footer>
    </div>
  );
}

export default MyApp;
