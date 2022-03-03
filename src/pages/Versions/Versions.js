import React from "react";
import PropTypes from "prop-types";
import {IonCol, IonContent, IonGrid, IonPage, IonRow} from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import PkDataAsJson from "../../components/PkDataAsJson";
import PkErrors from "../../components/PkErrors";
import "./Versions.css";

export default function Versions({navState, setNavState, catalog, catalogErrors}) {

    return (
        <IonPage>
            <PageHeader
                title="List Versions"
                navState={navState}
                setNavState={setNavState}
                catalog={catalog}
            />
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <PkDataAsJson data={catalog}/>
                        </IonCol>
                    </IonRow>
                    {catalogErrors && catalogErrors.length > 0 && (
                        <IonRow>
                            <IonCol>
                                <PkErrors errors={catalogErrors}/>
                            </IonCol>
                        </IonRow>
                    )}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

Versions.propTypes = {
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
    catalogErrors: PropTypes.any,
};
