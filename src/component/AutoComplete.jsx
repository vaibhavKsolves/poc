import React, { useEffect, useState } from "react";

const AutoComplete = () => {
  const [input, setInput] = useState("");
  const [isFocused,setIsfocused]=useState(false)
  const [recipe, setRecipe] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered item
  const [cache,setCachedData] =useState({})

  const fetchData = async () => {
    if(cache[input]){
        console.log('inputtttttW');
        setRecipe(cache[input]);
        return
    }
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const json = await data.json();
    console.log(input,'called')
    setRecipe(json?.recipes);
    setCachedData((prev)=>({...prev,[input]:json?.recipes}))
  };

  useEffect(() => {
    const timer=setTimeout(fetchData,300);
    return ()=>{
        clearTimeout(timer)
    }
  }, [input]);

  return (
    <div style={styles.container}>
      <div>
        <input
          type="text"
          placeholder="Enter a text..."
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          onFocus={()=>setIsfocused(true)}
          onBlur={()=>setIsfocused(false)}
        />
      </div>

      {isFocused&& <div style={styles.suggestionsBox}>
        {recipe.map((data, index) => (
          <div
            key={data.id}
            style={{
              ...styles.suggestionItem,
              backgroundColor: hoveredIndex === index ? "red" : "white",
              color: hoveredIndex === index ? "white" : "black",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
           
          >
            {data.name}
          </div>
        ))}
      </div>}
    </div>
  );
};

// 🎨 Inline Styles
const styles = {
  container: {
    width: "300px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "0.3s",
  },
  suggestionsBox: {
    marginTop: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    maxHeight: "200px",
    overflowY: "auto",
  },
  suggestionItem: {
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    borderBottom: "1px solid #eee",
  },
};

export default AutoComplete;
