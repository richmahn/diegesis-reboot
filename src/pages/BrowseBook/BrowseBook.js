import React from "react";
import PropTypes from "prop-types";
import { IonPage } from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import StubPageContent from "../../components/StubPageContent";
import "./BrowseBook.css";

export default function BrowseBook({ pkState, navState, setNavState }) {
  const getBBQuery = (navState) => {
    const query =
      "{" +
      'docSet(id:"%docSetId%") {' +
      "  id" +
      '  document(bookCode:"%bookCode%") {' +
      "      mainBlocks {" +
      "        text" +
      "      }" +
      "    }" +
      "  }" +
      "}";
    return query
      .replace("%docSetId%", navState.docSetId)
      .replace("%bookCode%", navState.bookCode);
  };
  return (
    <IonPage>
      <PageHeader
        title="Browse Book"
        navState={navState}
        setNavState={setNavState}
      />
      <StubPageContent
        pkState={pkState}
        query={getBBQuery(navState)}
        description="View all the content of a book. The current query displays plain text for one paragraph at a time."
      />
    </IonPage>
  );
}

BrowseBook.propTypes = {
  pkState: PropTypes.object.isRequired,
  navState: PropTypes.object.isRequired,
  setNavState: PropTypes.func.isRequired,
};
