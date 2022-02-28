import {IonHeader, IonTitle, IonToolbar} from "@ionic/react";
import React from "react";
import PropTypes from "prop-types";

export default function PageHeader({title}) {
    return <IonHeader>
        <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
        </IonToolbar>
    </IonHeader>
}

PageHeader.propTypes = {
    title: PropTypes.string,
};
