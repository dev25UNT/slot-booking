import React, { useState } from "react";
import SlotModal from "../components/SlotModal";

const HomePage = () => {
  const [btnClicked, setBtnClicked] = useState(false);
  const clickHandler = () => {
    setBtnClicked(true);
  };
  return (
    <div className="homePage">
      {!btnClicked && (
        <button className="slotButton" onClick={clickHandler}>
          Book your Slot
        </button>
      )}
      {btnClicked && <SlotModal btnClicked={btnClicked} />}
    </div>
  );
};

export default HomePage;
