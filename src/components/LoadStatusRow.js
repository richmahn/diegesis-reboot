import {IonCol, IonRow} from "@ionic/react";
import PropTypes from "prop-types";
import React from "react";

export default function LoadStatusRow({status}) {
    return <IonRow>
        <IonCol className={status ? "isLoaded" : "isNotLoaded"}>{
            status ?
                'Loaded' :
                'Not Loaded'
        }</IonCol>
    </IonRow>

}

LoadStatusRow.propTypes = {
    status: PropTypes.bool,
};
