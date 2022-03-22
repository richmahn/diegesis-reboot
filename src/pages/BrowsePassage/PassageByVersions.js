import React from "react";
import PropTypes from "prop-types";
import {IonCol, IonRow, IonTitle} from '@ionic/react';
import PassageByVersion from "./PassageByVersion";

export default function PassageByVersions({docSets}) {

    return docSets?.map(
            (ds, n) => <div key={n}><IonRow>
                        <IonCol>
                            <IonTitle>Foo {ds.id}</IonTitle>
                        </IonCol>
                    </IonRow>
                    <PassageByVersion key={n} docSet={ds} />
            </div>
        );
}

 PassageByVersions.propTypes = {
     docSets: PropTypes.array.isRequired,
     keyPrefix: PropTypes.number.isRequired,
 };
