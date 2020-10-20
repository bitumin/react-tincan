import React from 'react';
import './tincan-min';

const TincanContext = React.createContext();

export function TinCanProvider({children}) {
    const tinCan = useProvideTinCan();
    return <TincanContext.Provider value={tinCan}>{children}</TincanContext.Provider>;
}

export const useTinCan = () => {
    return React.useContext(TincanContext);
};

// xAPI param fetching and initialization.
const urlParams = new URLSearchParams(window.location.search);
const endpoint = urlParams.get('endpoint');
const auth = urlParams.get('auth');
const actor = JSON.parse(urlParams.get('actor'));
const activity_id = urlParams.get('activity_id');
const registration = urlParams.get('registration');

let lrs = null;
try {
    lrs = new TinCan.LRS({
        endpoint: endpoint,
        auth: auth,
    });
    console.info('TinCan LRS initialized');
} catch (err) {
    console.error('Error initializing TinCan LRS', err);
}

const defaultConfig = {
    actor: actor,
    object: {
        id: activity_id,
        objectType: "Activity",
    },
    context: {
        registration: registration,
    },
}

const defaultCompletionConfig = {
    verb: {
        id: "http://adlnet.gov/expapi/verbs/completed",
        display: {
            "de-DE" : "beendete",
            "en-US" : "completed",
            "fr-FR" : "a terminé",
            "es-ES" : "completó"
        },
    },
    result: {
        completion: true
    }
};

function useProvideTinCan() {
    const saveCompleted = () => {
        return saveStatement(defaultCompletionConfig);
    }

    const saveStatement = (config, initConfig = undefined) => {
        return new Promise((resolve, reject) => {
            if (lrs === null) {
                reject('LRS did not initialize');
                return;
            }
            lrs.saveStatement(new TinCan.Statement({...defaultConfig, ...config}, initConfig), {
                callback: function (error, xhr) {
                    if (error === null) {
                        resolve();
                    } else {
                        reject(error, xhr);
                    }
                }
            });
        });
    }

    return {
        saveCompleted,
        saveStatement,
    };
}
