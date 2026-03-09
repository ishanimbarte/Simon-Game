import { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard(){

  const [scores,setScores] = useState([]);

  useEffect(()=>{

    const fetchScores = async () => {
      try {
        // Try production URL first, fallback to localhost
        const apiUrl = import.meta.env.VITE_API_URL || 'https://simon-game-production-3e59.up.railway.app/api';
        const res = await axios.get(`${apiUrl}/scores`);
        setScores(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching scores:", err);
        setScores([]);
      }
    };

    fetchScores();

  },[]);

  return(

    <div className="text-center mt-10">

      <h1 className="text-3xl font-bold mb-6">
        Leaderboard
      </h1>

      {scores.map((item)=>(
        <p key={item._id} className="text-lg">
          {item.username} - {item.score}
        </p>
      ))}

    </div>

  );
}