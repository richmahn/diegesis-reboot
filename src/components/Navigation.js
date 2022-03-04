import React from "react";
import BibleDropDown from "./BibleDropDown";
import { IonCol } from "@ionic/react";
import PropTypes from "prop-types";
import BookDropDown from "./BookDropDown";
import ChapterDropDown from "./ChapterDropDown";
import VerseDropDown from "./VerseDropDown";

const Navigation = ({ navState, setNavState, catalog }) => {
  return (
    <>
      <IonCol size={3}>
        <BibleDropDown
          navState={navState}
          setNavState={setNavState}
          catalog={catalog}
        />
      </IonCol>
      <IonCol size={3}>
        <BookDropDown
          navState={navState}
          setNavState={setNavState}
          catalog={catalog}
        />
      </IonCol>
      <IonCol size={3}>
        <ChapterDropDown />
      </IonCol>
      <IonCol size={3}>
        <VerseDropDown />
      </IonCol>
    </>
  );
};

export default Navigation;

Navigation.propTypes = {
  navState: PropTypes.object.isRequired,
  setNavState: PropTypes.func.isRequired,
  catalog: PropTypes.object.isRequired,
};
