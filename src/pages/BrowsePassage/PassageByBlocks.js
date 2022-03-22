import React from "react";
import PropTypes from "prop-types";
import {IonCol, IonRow, IonTitle} from '@ionic/react';

export default function PassageByBlocks({docSet, keyPrefix, displayFlags, displayMode, navState}) {
    <div key={keyPrefix}>
        <IonRow>
            <IonCol>
                <IonTitle>{docSet.id}</IonTitle>
            </IonCol>
        </IonRow>
        {docSet?.filter(
            (ds) => displayFlags[displayMode].allDocSets || ds.id === navState.docSetId
            )[0]?.document.mainSequence.blocks.map(b => b.text)}
    </div>
}

PassageByBlocks.propTypes = {
    docSet: PropTypes.array.isRequired,
    keyPrefix: PropTypes.number.isRequired,
    displayFlags: PropTypes.object.isRequired,
    displayMode: PropTypes.string.isRequired,
    navState: PropTypes.object.isRequired,
    allDocSets: PropTypes.bool.isRequired,
};