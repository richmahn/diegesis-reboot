import React from "react";
import {useQuery} from "proskomma-react-hooks";
import PropTypes from "prop-types";
import {IonCol, IonContent, IonGrid, IonPage, IonRow} from '@ionic/react';

import PageHeader from "../../components/PageHeader";

import "./BrowseChapter.css";

export default function BrowseChapter({ pkState, navState, setNavState, catalog }) {
  const getBBCQuery = (navState) => {
      const query = '{' +
          '  docSet(id:"%docSetId%") {' +
          '    id' +
          '    document(bookCode:"%bookCode%") {' +
          '      mainSequence {' +
          '        blocks(withScriptureCV:"%chapter%") {' +
          '           scopeLabels(startsWith:["blockTag"])' +
          '            items{type subType payload}' +
          '       }' +
          '      }' +
          '    }' +
          '  }' +
          '}';
    return query
      .replace("%docSetId%", navState.docSetId)
      .replace("%bookCode%", navState.bookCode)
      .replace("%chapter%", navState.chapter);
  };

    const verbose=true;

    const queryState = useQuery({
        ...pkState,
        query: getBBCQuery(navState),
        verbose,
    });

    const renderParagraphContents = b => b.items.map((b, n) => {
        if (b.type === 'token') {
            return <span className={'c' + n} key={n}>{b.payload}</span>;
        } else if (b.type === 'scope' && b.subType === 'start' && b.payload.startsWith('verses/')) {
            return <span className='verse' key={n}>{b.payload.split('/')[1]}</span>;
        }
    }
    );

    const renderBlock = (b, n) => {
        return <p className={b.scopeLabels[0].split('/')[1]} key={n}>
            {renderParagraphContents(b)}
        </p>
    };

    return (
        <IonPage>
            <PageHeader title="Browse Chapter" navState={navState}  setNavState={setNavState} catalog={catalog} />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            {
                                queryState.data.docSet &&
                                queryState.data.docSet.document.mainSequence.blocks
                                    .map((b, n) => renderBlock(b, n))
                            }
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

BrowseChapter.propTypes = {
  pkState: PropTypes.object.isRequired,
  navState: PropTypes.object.isRequired,
  setNavState: PropTypes.func.isRequired,
  catalog: PropTypes.object.isRequired,
};
