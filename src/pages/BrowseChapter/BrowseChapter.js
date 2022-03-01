import React from 'react';
import {useQuery} from "proskomma-react-hooks";
import PropTypes from "prop-types";
import {IonCol, IonContent, IonGrid, IonPage, IonRow} from '@ionic/react';
import PageHeader from "../../components/PageHeader";

import './BrowseChapter.css';

export default function BrowseChapter({pkState}) {

    const query = '{' +
    '  docSet(id:"xyz-eng_webbe") {' +
    '    id' +
    '    document(bookCode:"MAT") {' +
    '      mainSequence {' +
    '        blocks(withScriptureCV:"6") {' +
    '           scopeLabels(startsWith:["blockTag"])' +
    '            items{type subType payload}' +
    '       }' +
    '      }' +
    '    }' +
    '  }' +
    '}';

    const verbose=true;

   // <IonCol>
   // {JSON.stringify(queryState)}
   //</IonCol>
    // {queryState.data.docSet.document.cv.tokens.map((t, n) => [<span key={n}>{t.payload}</span>,' '])} //tokens{payload} // {JSON.stringify(queryState)}

    const queryState = useQuery({
        ...pkState,
        query,
        verbose,
    });

    //console.log(queryState.data);

    const renderBlock = b => b.items.map((b, n) => {
        if (b.type === 'token')
        {
            return <span key={n}>{b.payload}</span>;
        }
        else if (b.type === 'scope' && b.subType === 'start' && b.payload.startsWith('verse/'))
        {
            return <span className='verse' key={n}>{b.payload.split('/')[1]}</span>;
        }
    }
    );


    return (
        <IonPage>
            <PageHeader title="Browse Chapter" />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            {queryState.data.docSet && queryState.data.docSet.document.mainSequence.blocks.map((b, n) => <p key={n}>{renderBlock(b)}</p>)}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

BrowseChapter.propTypes = {
    pkState: PropTypes.object.isRequired,
};
