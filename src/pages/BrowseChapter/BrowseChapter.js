import React from 'react';
import PropTypes from "prop-types";
import {IonPage} from '@ionic/react';
import PageHeader from "../../components/PageHeader";
import StubPageContent from "../../components/StubPageContent";

import './BrowseChapter.css';

export default function BrowseChapter({pkState}) {

    const query = '{' +
    '  docSet(id:"xyz-spa_rv09") {' +
    '    id' +
    '    document(bookCode:"GAL") {' +
    '      id' +
    '      cv(chapter:"5") {' +
    '        text' +
    '      }' +
    '    }' +
    '  }' +
    '}';

    return (
        <IonPage>
            <PageHeader title="Browse Chapter" />
            <StubPageContent
                pkState={pkState}
                query={query}
                description="Browse one chapter of a book. The current query displays the text for the entire chapter as one string."
            />
        </IonPage>
    );
}

BrowseChapter.propTypes = {
    pkState: PropTypes.object.isRequired,
};