import React from "react";
import PropTypes from "prop-types";
import {IonCol, IonRow} from '@ionic/react';

export default function PassageByVersion({docSet, keyPrefix}) {
    const sLO = (sL) => {
        const ret = {};
        sL.forEach(l => {
            const [scopeType, scopeNumber] = l.split("/");
            ret[scopeType] = scopeNumber;
        })
        return ret;
    };

    return <div key={keyPrefix}>
        
        {docSet.document?.cv.map(
            (v, n2) => <IonRow key={`${keyPrefix}-${n2}`}>

                <IonCol size={2}>
                    {`${sLO(v.scopeLabels)["chapter"]}:${sLO(v.scopeLabels)["verses"]}`}
                </IonCol>
                <IonCol size={10}>
                    {v.text}
                </IonCol>
            </IonRow>
        )
        }
    </div>
}

PassageByVersion.propTypes = {
    docSet: PropTypes.object.isRequired,
    keyPrefix: PropTypes.number.isRequired,
};