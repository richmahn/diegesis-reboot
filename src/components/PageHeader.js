import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import PropTypes from "prop-types";

export default function PageHeader({ title, navState }) {
  // To do 1. Add drop down selectors for Bible, Book, Chapter , verse
  // 2. Use navState to show current value
  // 3. Use setNavState to set new value on change
  // 4. Add Next, previous buttons as per the tab ie next chapter /previous chapter on chapters tab
  // 5. Hide Book, chapter, verse dropdown as per tab

  console.log(navState);
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle size="large">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string,
  navState: PropTypes.object.isRequired,
  setNavState: PropTypes.func.isRequired,
};
