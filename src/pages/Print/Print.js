import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {IonCol, IonContent, IonGrid, IonPage, IonRow} from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import {ScriptureParaModel, ScriptureParaModelQuery} from "proskomma-render";
import MainDocSet from './MainDocSet';
import "./Print.css";

export default function Print({pkState, navState, setNavState, catalog}) {

    useEffect(
        () => {
            const config = {
                    "bookOutput": {},
                    "title": "unfoldingWord Literal Translation",
                    "language": "en",
                    "textDirection": "ltr",
                    "uid": "ULT",
                    "bookSources": [
                        "MAT",
                        "MRK",
                        "LUK",
                        "JHN"
                    ],
                    "peripheralSources": [],
                    "structure": [
                        [
                            "section",
                            "nt",
                            [
                                [
                                    "bookCode",
                                    "MAT"
                                ],
                                [
                                    "bookCode",
                                    "MRK"
                                ],
                                [
                                    "bookCode",
                                    "LUK"
                                ],
                                [
                                    "bookCode",
                                    "JHN"
                                ]
                            ]
                        ]
                    ],
                    "i18n": {
                        "notes": "Notes",
                        "tocBooks": "Books of the Bible",
                        "titlePage": "unfoldingWord Literal Translation: Psalms and Gospels",
                        "copyright": "Licensed under a Creative Commons Attribution-Sharealike 4.0 International License",
                        "coverAlt": "Cover",
                        "preface": "Preface",
                        "ot": "Old Testament",
                        "nt": "New Testament"
                    }
                };
            const doRender = async () => {
                const queryJson = await ScriptureParaModelQuery(pkState.proskomma, [navState.docSetId]);
                const model = new ScriptureParaModel(queryJson, config);
                model.addDocSetModel('default', new MainDocSet(queryJson, model.context, config));
                model.render();
            }
            if (catalog.docSets) {
                doRender().then();
            }
        },
        [pkState.proskomma, catalog.docSets, navState.docSetId]
    );
    return (
        <IonPage>
            <PageHeader
                title="Print to PDF or Something Like That"
                navState={navState}
                setNavState={setNavState}
                catalog={catalog}
            />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            To do!
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

Print.propTypes = {
    pkState: PropTypes.object.isRequired,
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
};
