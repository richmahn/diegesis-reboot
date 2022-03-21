import React from "react";
import PropTypes from "prop-types";
import {IonCol, IonRow, IonTitle} from '@ionic/react';
import PassageByVersions from "./PassageByVersions";

const PassageByVerse = function({cvArray, docSets}) {
    return cvArray.map((cv, n) => <div key={n}>
            <IonRow>
                <IonCol>
                    <IonTitle>{cv[0].split("/")[1]}:{cv[1].split("/")[1]}</IonTitle>
                </IonCol>
            </IonRow>
            {docSets.map((ds, n2) =>
                <IonRow key={n2}>
                    <IonCol size={2}>
                        {ds.id}
                    </IonCol>
                    <IonCol size={10}>
                        {ds.document.cv[n].text}
                    </IonCol>
                </IonRow>
            )}
        </div>
    )
};

PassageByVerse.propTypes = {
    cvArray: PropTypes.array.isRequired,
    docSets: PropTypes.array.isRequired,
};

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