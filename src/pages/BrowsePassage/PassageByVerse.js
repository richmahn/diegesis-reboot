import React from "react";
import PropTypes from "prop-types";
import {IonCol, IonRow, IonTitle} from '@ionic/react';

export default function PassageByVerse({cvArray, docSets}) {
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
}

PassageByVerse.propTypes = {
    cvArray: PropTypes.array.isRequired,
    docSets: PropTypes.array.isRequired,
};