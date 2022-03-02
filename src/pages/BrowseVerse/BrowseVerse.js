import React from 'react';
import {useQuery} from "proskomma-react-hooks";
import PropTypes from "prop-types";
import {IonCol, IonContent, IonGrid, IonPage, IonRow} from '@ionic/react';
import PageHeader from "../../components/PageHeader";

import './BrowseVerse.css';

export default function BrowseVerse({pkState}) {

    const query = '{' +
    '  docSets {' +
    '    id' +
    '    Language:selector(id:"lang")' +
    '    Version:selector(id:"abbr")' +
    '    document(bookCode:"MAT") {' +
    '      mainSequence {' +
    '        blocks(withScriptureCV:"6:9") {' +
    '            items(withScriptureCV:"6:9"){type subType payload}' +
    '       }' +
    '      }' +
    '    }' +
    '  }' +
    '}';

    const verbose=true;

    const queryState = useQuery({
         ...pkState,
         query,
         verbose,
     });

    console.log(queryState);

    const renderParagraphContents = b => b.items.map((i, n) => {
        if (i.type === 'token')
        {
            return <span className={'c' + n} key={n}>{i.payload}</span>;
        }
        else if (i.type === 'scope' && i.subType === 'start' && i.payload.startsWith('verse/'))
        {
            return <span className='scrRef' key={n}>{'MAT 6:' + i.payload.split('/')[1]}</span>;
        }
    }
    );

    const renderVerse = (b, n) => {
         return <p className="scripture" key={n}>{renderParagraphContents(b)}</p>
    };

    const renderDocSetInfo = (ds) => {
        return <><p><span className='label'>Language: </span><span className='identifier'>{ds.Language}</span></p><p><span className='label'>Version: </span><span className='identifier'>{ds.Version}</span></p></>
    }

    const renderRow = (ds, n) => {
         return <IonRow key={n}>
                    <IonCol size="2" key="docId">
                        {renderDocSetInfo(ds)}
                    </IonCol>
                    <IonCol key ="verse">
                        {ds.document.mainSequence.blocks && ds.document.mainSequence.blocks.map((b, n) => renderVerse(b, n))}
                    </IonCol>
                </IonRow>
    };

    return (
        <IonPage>
            <PageHeader title="Browse Verse" />
            <IonContent>
                <IonGrid>
                    {queryState.data.docSets && queryState.data.docSets.map((ds, n) => renderRow(ds, n))}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

BrowseVerse.propTypes = {
    pkState: PropTypes.object.isRequired,
};
