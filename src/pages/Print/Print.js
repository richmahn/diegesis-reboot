import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
    IonCol,
    IonContent,
    IonGrid,
    IonPage,
    IonRow,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonButton,
} from "@ionic/react";
import {doRender} from 'proskomma-render-pdf';
import PageHeader from "../../components/PageHeader";
import "./Print.css";
import {pagedJSStyle} from "./htmlResources";

export default function Print({pkState, navState, setNavState, catalog}) {
    const [bibleName, setBibleName] = useState(navState.docSetId);
    const [userTypedBibleName, setUserTypedBibleName] = useState(false);
    const [bibleBooks, setBibleBooks] = useState([]);
    const [bibleBookOptions, setBibleBookOptions] = useState([]);

    useEffect(() => {
        if (!userTypedBibleName) {
            setBibleName(navState.docSetId);
        }
    }, [navState.docSetId, userTypedBibleName])

    useEffect(() => {
        const doQuery = async () => {
            setBibleName(navState.docSetId);
            setBibleBookOptions(
                catalog.docSets.filter(ds => ds.id === navState.docSetId)[0].documents
                    .map(
                        doc => <IonSelectOption
                            key={doc.id}
                            value={doc.bookCode}
                            selected={bibleBooks.includes(doc.bookCode)}
                        >
                            <IonLabel>{doc.bookCode}</IonLabel>
                        </IonSelectOption>
                    )
            );
        }
        if (pkState.proskomma && navState.docSetId && catalog.docSets && catalog.docSets.length) {
            doQuery().then();
        }
    }, [pkState.proskomma, catalog.docSets, navState.docSetId], bibleBooks);

    useEffect(
        () => {
            const doLocalRender = async () => {
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
                            "canonical",
                            bibleBooks.map(book => ["bookCode", book]),
                        ]
                    ],
                    "i18n": {
                        "notes": "Notes",
                        "tocBooks": "Content",
                        "titlePage": bibleName,
                        "copyright": "Licensed under a Creative Commons Attribution-Sharealike 4.0 International License",
                        "coverAlt": "Cover",
                        "preface": "Preface",
                        "ot": "Old Testament",
                        "nt": "New Testament",
                        "canonical": "Books of the Bible"
                    }
                };
                console.log("Start Render Query")
                const newPage = window.open();
                newPage.document.head.innerHTML = "<title>PDF Preview</title>";
                config.newPage = newPage;
                const config2 = await doRender(
                    pkState.proskomma,
                    config,
                    [navState.docSetId],
                    catalog.docSets
                        .filter(ds => ds.id === navState.docSetId)[0]
                        .documents
                        .filter(d => bibleBooks.includes(d.bookCode))
                        .map(d => d.id)
                );
                return config2;
            }
            if (bibleBooks.length > 0) {
                doLocalRender()
                    .then(config2 => {
                            config2.newPage.document.body.innerHTML = config2.output.replace(/^[\s\S]*<body>/, "").replace(/<\/body>[\s\S]*/, "");
                            const script = document.createElement('script');
                            script.src = 'https://unpkg.com/pagedjs/dist/paged.polyfill.js';
                            config2.newPage.document.head.appendChild(script);
                            const style = document.createElement('style');
                            style.innerHTML = pagedJSStyle;
                            config2.newPage.document.head.appendChild(style);
                        }
                    )
            }
        },
        [bibleName, bibleBooks]
    );

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
                            <IonItem>
                                <IonLabel>Bible Name:</IonLabel>
                                <IonInput
                                    onIonBlur={
                                        e => {
                                            setBibleName(e.target.value);
                                            setUserTypedBibleName(true);
                                        }
                                    }
                                    value={bibleName}
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size={10}>
                            <IonItem>
                                <IonLabel>Select One or More Books</IonLabel>
                                <IonSelect
                                    class="printBookSelect"
                                    placeHolder="Select Books to Render"
                                    value={bibleBooks}
                                    multiple={true}
                                    cancelText="Cancel"
                                    okText="Set"
                                    onIonChange={e => setBibleBooks(e.detail.value)}
                                    disabled={bibleBookOptions.length === 0}
                                >
                                    {bibleBookOptions}
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                        <IonCol size={1}>
                            <IonButton
                                color="secondary"
                                size="small"
                                onClick={
                                    () => {
                                        setBibleBooks(catalog.docSets.filter(ds => ds.id === navState.docSetId)[0].documents.map(doc => doc.bookCode));
                                    }
                                }
                                disabled={bibleBookOptions.length === 0}
                            >
                                All Books
                            </IonButton>
                        </IonCol>
                        <IonCol size={1}>
                            <IonButton
                                color="secondary"
                                size="small"
                                class="ion-float-right"
                                onClick={
                                    () => {
                                        setBibleBooks([]);
                                        document.querySelector("#preview").innerHTML = ""
                                    }
                                }
                                disabled={bibleBookOptions.length === 0}
                            >
                                No Books
                            </IonButton>
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
