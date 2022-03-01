import React from "react";
import PropTypes from "prop-types";
import { IonPage } from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import StubPageContent from "../../components/StubPageContent";

import "./BrowseChapter.css";

export default function BrowseChapter({ pkState, navState, setNavState }) {
  const getBBCQuery = (navState) => {
    const query =
      "{" +
      '  docSet(id:"%docSetId%") {' +
      "    id" +
      '    document(bookCode:"%bookCode%") {' +
      "      id" +
      '      cv(chapter:"%chapter%") {' +
      "        text" +
      "      }" +
      "    }" +
      "  }" +
      "}";
    return query
      .replace("%docSetId%", navState.docSetId)
      .replace("%bookCode%", navState.bookCode)
      .replace("%chapter%", navState.chapter);
  };

  return (
    <IonPage>
      <PageHeader
        title="Browse Chapter"
        navState={navState}
        setNavState={setNavState}
      />
      <StubPageContent
        pkState={pkState}
        query={getBBCQuery(navState)}
        description="Browse one chapter of a book. The current query displays the text for the entire chapter as one string."
      />
    </IonPage>
  );
}

BrowseChapter.propTypes = {
  pkState: PropTypes.object.isRequired,
  navState: PropTypes.object.isRequired,
  setNavState: PropTypes.func.isRequired,
};
