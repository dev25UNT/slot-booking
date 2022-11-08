import styles from "@/styles/components/Popups/Checkout.module.css";
import { useEffect, useState } from "react";
import { Alert, Col, Image, Modal, Row } from "react-bootstrap";
import Slider from "react-slick";
import PrimaryButton from "../common/PrimaryButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  API_URL,
  daysforcal,
  GMAP_API,
  monthsforcal,
  timesofsloats,
} from "utils/data";
import { FiSearch } from "react-icons/fi";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { Gmaps, Marker } from "react-gmaps";
import { enddate, getDatesInRange, startdate } from "utils/calenderPackage";
import { calenderslidersettings } from "utils/sliderSettings";
import { StatusProcess } from "./StatusProcess";
import NavigationHandler from "./NavigationHandler";
import {
  AddToCart,
  CityDetactionAPI,
  MyAddress,
  PincodeByCity,
  SaveAddress,
  TimeSloatAPI,
} from "pages/api/api";
import { getPincode, MatchCity } from "utils/utilsfunctions";
import { RiAddFill } from "react-icons/ri";
import Coupons from "./Coupons";
import PaymentOption from "./PaymentOption";
import { useDispatch, useSelector } from "react-redux";
import CouponsCard from "./CouponsCard";
import { CgCloseO } from "react-icons/cg";
import {
  removeCoupons,
  setCouponssSuccess,
} from "redux/actions/couponActions/couponsActions";
import CartProductList from "./CartProductList";
import {
  callAddorRemoveCart,
  callMyCartBycity,
} from "redux/actions/cartActions/cartActions";
import Thankyou from "./ThankYou";
import ThankYouHero from "../ThankYou/ThankYouHero";
import { postOrders } from "api/ordersAPI";
import axios from "axios";

export default function CheckoutPopup({ show, onHide, backmain }) {
  const dispatch = useDispatch();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [showDateError, setShowDateError] = useState(false);
  const [showTimeError, setShowTimeError] = useState(false);

  const [changeModalSize, setChangeModalSize] = useState(true);
  const [timesloatsata, setTimeSloatData] = useState([]);

  const [completedSloat, setCompletedSloat] = useState([]);

  const [dateandTimeSelection, setDateAndTimeSelection] = useState(true);

  const [proccessComplete, setProcessComplete] = useState(false);
  const [datelist, setDateList] = useState(getDatesInRange(startdate, enddate));
  // targetting the timesloatdata which help to set complete time sloat data
  useEffect(
    () => setCompletedSloat(TimeIsOver(timesloatsata, timesofsloats)),
    [timesloatsata]
  );
  // use function for timesloat is availabel or not
  const TimeIsOver = (timesloatsata, timesofsloats) => {
    let overdata = [];
    let newDate = new Date();
    let hours = newDate.getHours();

    for (let t = 0; t < timesloatsata.length; t++) {
      for (let l = 0; l < timesofsloats.length; l++) {
        if (timesloatsata[t].title == timesofsloats[l].time) {
          if (hours >= timesofsloats[l].over) {
            overdata.push(timesloatsata[t].title);
          }
        }
      }
    }
    return overdata;
  };

  // confirm process for confirm button
  const ConfirmProcessed = () => {
    selectedTime === null ? setShowTimeError(true) : setShowTimeError(false);
    selectedDate === null ? setShowDateError(true) : setShowDateError(false);
  };

  // time selecting handler
  const timeselectedHandler = (index) => {
    setShowTimeError(false);
    setSelectedTime(index);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size={changeModalSize ? "xl" : "lg"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="CheckoutPopup"
    >
      <Modal.Body
        className={`${styles.ModalBody} ${
          secondProcessShow && styles.LocationModalBody
        }`}
      >
        {proccessComplete ? (
          <ThankYouHero
            clkhandler={() => {
              onHide();
            }}
          />
        ) : (
          <>
            {/*======================================== date time selection ======================================== */}
            {dateandTimeSelection ? (
              <Row>
                <Col xs={12} md={12} lg={12} xl={12}>
                  {showDateError && (
                    <Alert variant={"danger"}>Please Select Date !</Alert>
                  )}
                  {showTimeError && (
                    <Alert variant={"danger"}>Please Select Time !</Alert>
                  )}
                </Col>

                <Col xs={12} md={12} lg={12} xl={12}>
                  <h5 className={styles.SubtitleText}>Select Date</h5>
                </Col>

                {/* date calander */}
                <Col
                  xs={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={styles.CalenderWrraper}
                >
                  <Slider
                    {...calenderslidersettings}
                    className={"CalendarSlider"}
                  >
                    {datelist.map((v, i) => (
                      <div
                        className={`${styles.CardOfdate} ${
                          selectedDate === i && styles.SelectedCardOfDate
                        }`}
                        key={i}
                        onClick={() => {
                          setShowDateError(false);
                          setSelectedDate(i);
                        }}
                      >
                        <div className={styles.Day}>{daysforcal[v.days]}</div>
                        <div className={styles.Date}>{v.dates + v.slogan}</div>
                        <div className={styles.Slogan}>
                          {monthsforcal[v.month]}
                        </div>
                      </div>
                    ))}
                  </Slider>
                </Col>

                {/* time sloat  */}
                <Col xs={12} md={12} lg={12} xl={12}>
                  <h5 className={styles.SubtitleText}>Select Time</h5>
                  <Row className={styles.SelectionTimeRow}>
                    {timesloatsata.map((v, i) => (
                      <Col
                        xs={6}
                        xl={4}
                        key={i}
                        className={`${styles.TimeCardCol}`}
                      >
                        <div
                          onClick={() =>
                            !new Date().getDate() == selectedDate &&
                            completedSloat.includes(v.title)
                              ? null
                              : timeselectedHandler(i)
                          }
                          className={`${styles.TimeCard} ${
                            selectedTime === i && styles.SelectedCard
                          }`}
                          style={
                            !new Date().getDate() == selectedDate &&
                            completedSloat.includes(v.title)
                              ? {
                                  backgroundColor: "grey",
                                  cursor: "not-allowed",
                                  opacity: "0.8",
                                  userSelect: "none",
                                }
                              : null
                          }
                        >
                          <p className={styles.TimeText}>
                            {v.title.replace("TO", "-")}
                          </p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            ) : null}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
