import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { ingredients } = req.query;

    const params = new URLSearchParams();
    // Append each item in the list as a parameter
    ingredients.forEach(item => {
    params.append('ingredients', item);
    });
    // Get the string representation of the parameters
    const paramString = params.toString();

    const base_uri = process.env.BACKEND_FULL_URI || "http://127.0.0.1:8000";
    // const base_uri = "https://cocktail-hyw73de6n-joachims97s-projects.vercel.app"
    const full_uri = `${base_uri}/cocktails`;
    const requestURL = `${full_uri}?${paramString}`;

    const response = await axios.get(requestURL);
    res.status(200).json(response.data);
    } 
    catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
