import React from "react";
import PropTypes from "prop-types";
import {IonAccordion, IonAccordionGroup, IonCol, IonContent, IonGrid, IonPage, IonRow, IonItem, IonLabel, IonList, IonTitle} from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import PkErrors from "../../components/PkErrors";
import "./Versions.css";

export default function Versions({navState, setNavState, catalog, catalogErrors}) {

    const makeAccordian = function (docSet, n) {
        return  <IonAccordion key ={n} value={docSet.id}>
                    <IonItem slot="header">
                        <IonLabel className="accordianLabel">{docSet.id}</IonLabel>
                    </IonItem>

                    <IonList slot="content">
                        {docSet.documents.map((d, n) => <IonItem key={n}><div>
                            <IonLabel className="bookCodeLabel">{d.bookCode} - {d.toc || d.h || d.toc2 || d.toc3}</IonLabel>
                        </div></IonItem>)}
                    </IonList>
                </IonAccordion>
    }

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
                            <IonTitle>{`${catalog.nDocuments} Bible Books in ${catalog.nDocSets} Bibles`}</IonTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonAccordionGroup expand="inset" value={navState.docSetId}>
                                {catalog.docSets && catalog.docSets.map((ds, n) => makeAccordian(ds, n))}
                            </IonAccordionGroup>
                        </IonCol>
                    </IonRow>
                    {catalogErrors && catalogErrors.length > 0 && (
                        <IonRow>
                            <IonCol>
                                <PkErrors errors={catalogErrors} />
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
