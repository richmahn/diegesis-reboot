import {IonCol, IonRow} from "@ionic/react";
import PkDataAsJson from "./PkDataAsJson";
import PkErrors from "./PkErrors";
import React from "react";
import PropTypes from "prop-types";

export default function PkResultDebugRows({result}) {
    return <>
        <IonRow>
            <IonCol>{
                result.data ?
                    <PkDataAsJson data={result.data} /> :
                    "No Data"
            }</IonCol>
        </IonRow>
        {
            result.errors &&
            <IonRow>
                <IonCol>
                    <PkErrors errors={result.errors} />
                </IonCol>
            </IonRow>
        }
    </>
}

PkResultDebugRows.propTypes = {
    result: PropTypes.object,
};
