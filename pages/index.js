import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { FaFilm } from "react-icons/fa";

export default function Home() {
  const [movieInput, setMovieInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie: movieInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setMovieInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>GPT Powered Generator</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main className={styles.main}>
       <FaFilm id="icon"/>
        <h3>Turning Your Fav Movie into a String of Emoticons</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter a movie"
            value={movieInput}
            onChange={(e) => setMovieInput(e.target.value)}
          />
          <input type="submit" value="Generate String of Emoticons" />
        </form>
        <div className='result'>{result}</div>
      </main>
    </div>
  );
}
