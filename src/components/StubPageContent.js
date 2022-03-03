import {IonContent, IonGrid, IonRow, IonCol, IonTitle} from "@ionic/react";
import PkResultDebugRows from "./PkResultDebugRows";
import React from "react";
import {useQuery} from "proskomma-react-hooks";
import PropTypes from "prop-types";

export default function StubPageContent({pkState, query, description}) {
    const verbose = true;

    const queryState = useQuery({
        ...pkState,
        query,
        verbose,
    });
    // console.log(query);
    return (
        <IonContent fullscreen>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonTitle size="small">{description || "No Description"}</IonTitle>
                    </IonCol>
                </IonRow>
                <PkResultDebugRows result={queryState} />
            </IonGrid>
        </IonContent>
    );
}

StubPageContent.propTypes = {
    pkState: PropTypes.object.isRequired,
    query: PropTypes.string.isRequired,
    description: PropTypes.string,
};
