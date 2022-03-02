import React from 'react';
import {useQuery} from "proskomma-react-hooks";
import PropTypes from "prop-types";
import {IonCol, IonContent, IonGrid, IonPage, IonRow} from '@ionic/react';
import PageHeader from "../../components/PageHeader";

import './BrowseVerse.css';

export default function BrowseVerse({pkState}) {

    const query = '{' +
    '  docSet(id:"xyz-spa_rv09") {' +
    '    id' +
    '    document(bookCode:"MAT") {' +
    '      mainSequence {' +
    '        blocks(withScriptureCV:"6:9") {' +
    '            items{type subType payload}' +
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

    const renderParagraphContents = b => b.items.map((b, n) => {
        if (b.type === 'token')
        {
            return <span className={'c' + n}>{b.payload}</span>;
        }
        else if (b.type === 'scope' && b.subType === 'start' && b.payload.startsWith('verse/'))
        {
            return <h1 key={n}>{'MAT 6:' + b.payload.split('/')[1]}</h1>;
        }
    }
    );

    const renderVerse = (b, n) => {
         return <p key={n}>{renderParagraphContents(b)}</p>
    };

    return (
        <IonPage>
            <PageHeader title="Browse Verse" />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            {queryState.data.docSet && queryState.data.docSet.document.mainSequence.blocks.map((b, n) => renderVerse(b, n))}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

BrowseVerse.propTypes = {
    pkState: PropTypes.object.isRequired,
};
