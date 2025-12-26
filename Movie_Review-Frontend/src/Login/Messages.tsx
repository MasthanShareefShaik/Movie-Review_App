import { useEffect, useState } from "react";
import axios from "axios";
import '../Styles/Messages.css'
type Messages = {
  onClose: () => void;
};

function Messages({ onClose }: Messages) {
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get("http://localhost:9090/popup_message", {
          withCredentials: true,
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching popup message:", error);
      }
    };
    fetchMessage();
  }, []);

  return (
    <div className="popup-container">
      <div className="popup-block">  
        <p className="popup-message">{message || "Loading message..."}</p>
        <button className="popup-button" title="close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Messages;
