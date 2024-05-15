// pages/_app.js

import "/src/app/globals.css";
import Navbar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer"
import {PantryProvider} from "../context/PantryContext";
import {RecipieRecommendationProvider} from '../context/RecipieRecommendationContext'


function MyApp({ Component, pageProps }) {

  return (
    <div >
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <div name="main" className="flex-1 ml-auto mr-auto mt-0 justify-between min-h-screen" style={{ width: '80%', height: '100vh' }}>
      <RecipieRecommendationProvider>
      <PantryProvider>
        <Component {...pageProps} />
      </PantryProvider>
      </RecipieRecommendationProvider>
      </div>
    </div>
      <Footer></Footer>
    </div>
  );
}

export default MyApp;
