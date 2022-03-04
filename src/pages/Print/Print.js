import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import {Buffer} from 'buffer';
import {IonCol, IonContent, IonGrid, IonPage, IonRow, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonInput, IonIcon} from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import {ScriptureParaModel, ScriptureParaModelQuery} from "proskomma-render";
import MainDocSet from './MainDocSet';
import "./Print.css";
import {Previewer} from "pagedjs";
import {printOutline} from "ionicons/icons";

export default function Print({pkState, navState, setNavState, catalog}) {
    const [bibleHtml, setBibleHtml] = useState("");
    const [queryJson, setQueryJson] = useState(null);
    const [bibleName, setBibleName] = useState(navState.docSetId);
    const [userTypedBibleName, setUserTypedBibleName] = useState(false);
    const [bibleBooks, setBibleBooks] = useState([]);
    const [bibleBookOptions, setBibleBookOptions] = useState([]);
    const previewer = new Previewer();

    useEffect(() => {
        if (! userTypedBibleName) {
            setBibleName(navState.docSetId);
        }
    }, [navState.docSetId, userTypedBibleName])

    useEffect(() => {
            const doQuery = async () => {
                const query = await ScriptureParaModelQuery(pkState.proskomma, [navState.docSetId])
                setQueryJson(query);
                // setBibleBooks(query.docSets[0].documents.map(doc => doc.idParts.parts[0]));
                setBibleBookOptions(query.docSets[0].documents.map(doc => <IonSelectOption key={doc.id} value={doc.idParts.parts[0]} selected={bibleBooks.includes(doc.idParts.parts[0])}>{doc.headers[3].value}</IonSelectOption>));
            }
            if (pkState.proskomma && navState.docSetId && catalog.docSets && catalog.docSets.length) {
                doQuery().then();
            }
    }, [pkState.proskomma, catalog.docSets, navState.docSetId], bibleBooks);

    useEffect(
        () => {
            const doRender = async () => {
                const config = {
                    "bookOutput": {},
                    "title": bibleName,
                    "language": "en",
                    "textDirection": "ltr",
                    "uid": "ULT",
                    "bookSources": bibleBooks,
                    "peripheralSources": [],
                    "structure": [
                        [
                            "section",
                            "nt",
                            bibleBooks.map(book=>["bookCode", book]),
                        ]
                    ],
                    "i18n": {
                        "notes": "Notes",
                        "tocBooks": "Books of the Bible",
                        "titlePage": bibleName,
                        "copyright": "Licensed under a Creative Commons Attribution-Sharealike 4.0 International License",
                        "coverAlt": "Cover",
                        "preface": "Preface",
                        "ot": "Old Testament",
                        "nt": "New Testament"
                    }
                };
                console.log("Config:", config);
                const model = new ScriptureParaModel(queryJson, config);
                model.addDocSetModel('default', new MainDocSet(queryJson, model.context, config));
                model.render();
                setBibleHtml(config.output);
                document.querySelector("#preview").innerHTML = "";
                previewer.
                    preview(
                        config.output,
                        ["Print.css"],
                        document.querySelector("#preview")
                    ).
                    then(flow => {
                        console.log("preview rendered, total pages", flow.total, { flow });
                    });
            }
            if (queryJson && bibleBooks.length > 0 && bibleName) {
                doRender().then();
            }
        },
        [queryJson, bibleName, bibleBooks]
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
                        //setBibleHtml(null);
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
                title="Print Preview / PDF"
                navState={navState}
                setNavState={setNavState}
                catalog={catalog}
            />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonList>
                                <IonItem>
                                    <IonLabel>Bible Name:</IonLabel>
                                    <IonInput onIonBlur={e => {setBibleName(e.target.value); setUserTypedBibleName(true)}} value={bibleName} />
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Books</IonLabel>
                                    <IonSelect value={bibleBooks} multiple={true} cancelText="Cancel" okText="Set" onIonChange={e => setBibleBooks(e.detail.value)}>
                                        {bibleBookOptions}
                                    </IonSelect>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>
                    {bibleHtml && <IonRow>
                        <IonCol>
                            <a id="print-icon" href="http://localhost:8088/html/bible.html" target="_blank" rel="noreferrer"><IonIcon size="large" title="Open HTML" icon={printOutline} /></a>
                        </IonCol>
                    </IonRow>}
                    <IonRow>
                        <IonCol>
                            <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
                            <div id="preview"></div>
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
