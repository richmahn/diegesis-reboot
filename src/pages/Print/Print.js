import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import {Buffer} from 'buffer';
import {IonCol, IonContent, IonGrid, IonPage, IonRow} from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import {ScriptureParaModel, ScriptureParaModelQuery} from "proskomma-render";
import MainDocSet from './MainDocSet';
import "./Print.css";

export default function Print({pkState, navState, setNavState, catalog}) {

    const [bibleHtml, setBibleHtml] = useState(null);

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
                setBibleHtml(config.output);
            }
            if (catalog.docSets) {
                doRender().then();
            }
        },
        [pkState.proskomma, catalog.docSets, navState.docSetId]
    );

    useEffect(
        () => {
            if (bibleHtml) {
                console.log("POST Bible HTML");
                const doPost = async () => {
                    const axiosInstance = axios.create({});
                    axiosInstance.defaults.headers = {
                        'Content-Type': 'multipart/form-data',
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    };
                    const formData = new FormData();
                    const buf = Buffer.from(bibleHtml);
                    formData.append('bibleHtml', buf)
                    await axiosInstance.post(
                        `http://localhost:8088/bibleHtml`,
                        formData,
                        {
                            responseType: 'arraybuffer',
                            "validateStatus": false,
                        }
                    ).then(res => {
                        console.log(String.fromCharCode.apply(null, new Uint8Array(res.data)));
                        setBibleHtml(null);
                    })
                }
                doPost().then();
            }
        },
        [bibleHtml]
    )

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
                            <a href="http://localhost:8088/html/bible.html" target="_blank" rel="noreferrer">Show Me My HTML!</a>
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
