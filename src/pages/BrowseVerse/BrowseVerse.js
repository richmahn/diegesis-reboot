import React from 'react';
import PropTypes from "prop-types";
import {IonPage} from '@ionic/react';
import PageHeader from "../../components/PageHeader";
import StubPageContent from "../../components/StubPageContent";

import './BrowseVerse.css';

export default function BrowseVerse({pkState}) {

    const query = '{' +
    '  docSet(id:"xyz-spa_rv09") {' +
    '    id' +
    '    document(bookCode:"GAL") {' +
    '      cv(chapter:"5") {' +
    '        text' +
    '        tokens {' +
    '          payload' +
    '        }' +
    '        items {' +
    '          type' +
    '          subType' +
    '          payload' +
    '        }' +
    '      }' +
    '    }' +
    '  }' +
    '}';

    return (
        <IonPage>
            <PageHeader title="Browse Verse" />
            <StubPageContent
                pkState={pkState}
                query={query}
                description="Show details of one verse. The current query shows the verse content as text, as tokens and as items."
            />
        </IonPage>
    );
}

BrowseVerse.propTypes = {
    pkState: PropTypes.object.isRequired,
};
