import React from "react";
import PropTypes from "prop-types";
import {IonCol, IonRow} from '@ionic/react';
import PassageByVersions from "./PassageByVersions";
import PassageByVerse from "./PassageByVerse";
import PassageByVersion from "./PassageByVersion";
import PkDataAsJson from "../../components/PkDataAsJson";

export default function PassageResults({reference, parseResult, docSets, displayFlags}) {
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
    } else if (displayFlags.byBlock) {
        return <PkDataAsJson data={docSets} />
    } else {    // by Verse
        if (displayFlags.groupVerses){
            return <PassageByVerse cvArray={cvArray} docSets={docSets} />;
        } else if (docSets.length === 1){
            return docSets.map((ds, n) => <PassageByVersion key={n} docSet={ds} keyPrefix={n} />);
        } else {
            return <PassageByVersions docSets={docSets} />;
        }
    }
}

PassageResults.propTypes = {
    reference: PropTypes.string.isRequired,
    parseResult: PropTypes.object.isRequired,
    docSets: PropTypes.array.isRequired,
    displayFlags: PropTypes.object.isRequired,
};