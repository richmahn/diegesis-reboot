import React from "react";
import PropTypes from "prop-types";
import {IonPage} from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import StubPageContent from "../../components/StubPageContent";

import "./Search.css";

export default function Search({pkState, navState, setNavState, catalog}) {
    const getSearchQuery = (navState, searchPhrase) => {
        const query =
            "{" +
            '  docSet(id:"%docSetId%") {' +
            "    id" +
            '    document(bookCode:"%bookCode%") {' +
            "      mainSequence {" +
            '    blocks(withChars:["%searchPhrase%"]) {' +
            '      scopeLabels(startsWith:["chapter", "verse/"])' +
            "      text" +
            "    }" +
            "  }" +
            "    }" +
            "  }" +
            "}";
        return query
            .replace("%docSetId%", navState.docSetId)
            .replace("%bookCode%", navState.bookCode)
            .replace("%searchPhrase%", searchPhrase);
    };

    return (
        <IonPage>
            <PageHeader
                title="Search"
                navState={navState}
                setNavState={setNavState}
                catalog={catalog}
            />
            <StubPageContent
                pkState={pkState}
                query={getSearchQuery(navState, "free")}
                description="Search for verses containing certain words (currently 'free' in Galatians)."
            />
        </IonPage>
    );
}

Search.propTypes = {
    pkState: PropTypes.object.isRequired,
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
};
