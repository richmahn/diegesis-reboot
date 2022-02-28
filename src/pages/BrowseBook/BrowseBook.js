import React from 'react';
import PropTypes from "prop-types";
import {IonPage} from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import StubPageContent from "../../components/StubPageContent";
import './BrowseBook.css';

export default function BrowseBook({pkState}) {

    const query = '{' +
        'docSet(id:"xyz-spa_vbl") {' +
        '  id' +
        '  document(bookCode:"GAL") {' +
        '      mainBlocks {' +
        '        text' +
        '      }' +
        '    }' +
        '  }' +
        '}';

    return (
        <IonPage>
            <PageHeader title="Browse Book" />
            <StubPageContent
                pkState={pkState}
                query={query}
                description="View all the content of a book. The current query displays plain text for one paragraph at a time."
            />
        </IonPage>
    );

}

BrowseBook.propTypes = {
    pkState: PropTypes.object.isRequired,
};
