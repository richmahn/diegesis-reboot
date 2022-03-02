import React from "react";
import PropTypes from "prop-types";
import { IonPage } from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import StubPageContent from "../../components/StubPageContent";

import "./BrowseVerse.css";

export default function BrowseVerse({ pkState, navState, setNavState, catalog }) {
  const getBBCVQuery = (navState) => {
    const query =
      "{" +
      '  docSet(id:"%docSetId%") {' +
      "    id" +
      '    document(bookCode:"%bookCode%") {' +
      '      cv(chapter:"%chapter%") {' +
      "        text" +
      "        tokens {" +
      "          payload" +
      "        }" +
      "        items {" +
      "          type" +
      "          subType" +
      "          payload" +
      "        }" +
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
        title="Browse Verse"
        navState={navState}
        setNavState={setNavState}
        catalog={catalog}
      />
      <StubPageContent
        pkState={pkState}
        query={getBBCVQuery(navState)}
        description="Show details of one verse. The current query shows the verse content as text, as tokens and as items."
      />
    </IonPage>
  );
}

BrowseVerse.propTypes = {
  pkState: PropTypes.object.isRequired,
  navState: PropTypes.object.isRequired,
  setNavState: PropTypes.func.isRequired,
  catalog: PropTypes.object.isRequired,
};
