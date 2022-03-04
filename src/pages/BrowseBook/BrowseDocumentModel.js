import React from 'react';

const {ScriptureParaDocument} = require('proskomma-render');

class BrowseDocumentModel extends ScriptureParaDocument {

    constructor(result, context, config) {
        super(result, context, config);
        config.rendered = [];
        config.blockStack = [];
        config.currentChapter = null;
        config.currentVerses = null;
        addActions(this);
    }
}

const addActions = (dInstance) => {
    dInstance.addAction(
        'startDocument',
        () => true,
        renderer => {
            renderer.config.nextKey = 0;
        }
    );
    dInstance.addAction(
        'startBlock',
        () => true,
        renderer => {
            renderer.config.blockStack = [];
        }
    );
    dInstance.addAction(
        'token',
        () => true,
        (renderer, context, data) => {
            renderer.config.blockStack.push(data.payload);
        }
    );
    dInstance.addAction(
        'scope',
        () => true,
        (renderer, context, data) => {
            const scopeName = data.payload.split('/')[0];
            const scopeValue = data.payload.split('/').slice(1).join('/');
            if (data.subType === 'start' && scopeName === 'verses') {
                renderer.config.currentVerses = scopeValue;
                let className = "verses_label";
                renderer.config.blockStack.push(
                    <span
                        id={`v_${renderer.config.currentChapter}_${scopeValue}`}
                        key={renderer.config.nextKey++}
                        className={className}
                    >
                        {scopeValue}
                    </span>);
            } else if (data.subType === 'end' && scopeName === 'verses') {
                renderer.config.currentVerses = null;
            } else if (data.subType === 'start' && scopeName === 'chapter') {
                renderer.config.currentChapter = scopeValue;
                renderer.config.blockStack.push(
                    <span
                        key={renderer.config.nextKey++}
                        className="chapter_label"
                    >
                        {scopeValue}
                    </span>);
            }
        }
    );
    dInstance.addAction(
        'endBlock',
        () => true,
        (renderer, context) => {
            const key = renderer.config.nextKey++;
            renderer.config.rendered.push(
                <p key={key}
                   id={key}
                   className={'usfm_' + context.sequenceStack[0].block.blockScope.split('/')[1]}
                >
                    {renderer.config.blockStack}
                </p>
            );
        }
    );
}

export default BrowseDocumentModel;
