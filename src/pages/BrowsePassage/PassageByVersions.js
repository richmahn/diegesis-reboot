import React from "react";
import PropTypes from "prop-types";
import {IonCol, IonRow, IonTitle} from '@ionic/react';

const PassageByVersion = function({docSet, keyPrefix}) {
    const sLO = (sL) => {
        const ret = {};
        sL.forEach(l => {
            const [scopeType, scopeNumber] = l.split("/");
            ret[scopeType] = scopeNumber;
        })
        return ret;
    };

    return <div key={keyPrefix}>
        <IonRow>
            <IonCol>
                <IonTitle>
                    {docSet.id}
                </IonTitle>
            </IonCol>
        </IonRow>
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
};

PassageByVersion.propTypes = {
    docSet: PropTypes.object.isRequired,
    keyPrefix: PropTypes.number.isRequired,
};

export default function PassageByVersions({docSets}) {
   return docSets?.filter(ds => ds.document).map((ds, n) => <PassageByVersion key={n} docSet={ds} keyPrefix={n} />);
}

PassageByVersions.propTypes = {
    docSets: PropTypes.array.isRequired,
};
