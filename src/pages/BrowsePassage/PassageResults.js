import React from "react";
import PropTypes from "prop-types";
import {IonCol, IonRow} from '@ionic/react';
import PassageByVersions from "./PassageByVersions";
import PassageByVerse from "./PassageByVerse";

export default function PassageResults({reference, parseResult, docSets, groupVerses}) {
    const cvArray = docSets[0]?.document.cv.map(v => v.scopeLabels) || [];

    if (reference === '') {
        return <IonRow>
            <IonCol>
                Please enter a book reference!
            </IonCol>
        </IonRow>;
    } else if (!parseResult.parsed || !parseResult.startVerse) {
        return <IonRow>
            <IonCol>
                Wrong format!
            </IonCol>
        </IonRow>;
    } else if (docSets?.filter(ds => ds.document).length === 0) {
        return <IonRow>
            <IonCol>
                Book not found!
            </IonCol>
        </IonRow>;
    } else if (docSets?.filter(ds => ds.document?.cv.length > 0).length === 0) {
        return <IonRow>
            <IonCol>
                Verse not found!
            </IonCol>
        </IonRow>;
    } else if (groupVerses){
        return <PassageByVerse cvArray={cvArray} docSets={docSets} />;
    } else {
        return <PassageByVersions docSets={docSets} />;
    }

}

PassageResults.propTypes = {
    reference: PropTypes.string.isRequired,
    parseResult: PropTypes.object.isRequired,
    docSets: PropTypes.array.isRequired,
    groupVerses: PropTypes.bool.isRequired,
};