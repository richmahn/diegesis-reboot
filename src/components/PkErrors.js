import React from "react";
import {IonCol, IonGrid, IonRow, IonTitle} from '@ionic/react';
import PropTypes from "prop-types";
import ReactJson from "react-json-view";

export default function PkErrors({errors}) {
    return <>
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonTitle className="error" size="small">Errors</IonTitle>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <ReactJson
                        src={errors}
                        theme="monokai"
                        style={{maxHeight: '300px', overflow: 'scroll', whiteSpace: 'pre'}}
                    />
                </IonCol>
            </IonRow>
        </IonGrid>
    </>
}

PkErrors.propTypes = {
    errors: PropTypes.array,
};
