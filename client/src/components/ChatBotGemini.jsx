import { useState, useEffect } from "react";
import axios from "axios";

const GeminiChatBot = () => {
  const [naruto, setNaruto] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post("https://naruto.revirifaldi.my.id/gemini", {
          naruto,
        });
        setResult(response.data);
      } catch (err) {
        console.error(err);
        setError(`Sorry, there was an error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (naruto) {
      fetchData();
    }
  }, [naruto]);

  const handleInputChange = (e) => {
    setNaruto(e.target.value);
  };

  const handleGeminiAI = () => {
    if (naruto) {
      setLoading(true);
      setResult("");
      setError(null);
    } else {
      setError("Please enter a prompt in the Naruto field.");
    }
  };

  return (
    <div>
      <h2>Gemini Chat Bot</h2>
      <div>
        <label htmlFor="naruto"></label>
            <input
                type="text"
                id="naruto"
                className="form-control"
                value={naruto}
                onChange={handleInputChange}
              />
      </div>
      <br />
      <button className="btn btn-info" onClick={handleGeminiAI} >
        {loading ? "Loading..." : "Submit"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div>
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GeminiChatBot;
