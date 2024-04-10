import fetch from "fetch"
import { translateText } from "../functions";

const api_key = "AIzaSyCbYHye0Yhs7nclncfItXxzfYfr-A0sPf8";

 async function translate(text) {
    let res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${api_key}`,
    { q: text, target: "es" }
    );
    let translation = res.data.data.translations[0].translatedText;
    return translation;
  }
  

export default translate()