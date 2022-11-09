import React, { useState } from "react";
import SlotModal from "../components/SlotModal";

const HomePage = () => {
  const [btnClicked, setBtnClicked] = useState(false);
  const clickHandler = () => {
    setBtnClicked(!btnClicked);
  };
  return (
    <div className={btnClicked ? "modal" : "homePage"}>
      {!btnClicked && (
        <button className="slotButton" onClick={clickHandler}>
          Book your Slot
        </button>
      )}
      {btnClicked && (
        <SlotModal btnClicked={btnClicked} clickHandler={clickHandler} />
      )}
    </div>
  );
};

export default HomePage;
