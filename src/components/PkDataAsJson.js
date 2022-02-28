import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import {IonTitle, IonGrid, IonRow, IonCol} from "@ionic/react";

export default function PkDataAsJson({data}) {
    return <IonGrid>
        <IonRow>
            <IonCol>
                <IonTitle size="small">Data</IonTitle>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
                <ReactJson
                    src={data}
                    theme="monokai"
                    collapseStringsAfterLength={80}
                    style={{maxHeight: '300px', overflow: 'scroll', whiteSpace: 'pre'}}
                />
            </IonCol>
        </IonRow>
    </IonGrid>
}

PkDataAsJson.propTypes = {
    data: PropTypes.object,
};
