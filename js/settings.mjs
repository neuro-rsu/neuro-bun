const pdb = new PouchDB('settings');

export let settings;

export const defaultSettings = {
    lesson: {
        number: 1,
        name: "Рыба",
    },
    topic: {
        number: 1,
        name: "Прыжок за рыбой"
    },
    topology: [1,2],
    populationCount: 10,
    crazyFish: {
        distance: {
            min: 100,
            max: 150,
        },
        top: {
            min: 10,
            max: 100,
        },
        hidden: false
    },
    user: {
        username: "",
    },
    connection: {
        host: "http://localhost",
        port: "5984",
    },
    theme: 'light',
}

export function compactSettings() {
    pdb.compact();
}

export function destroySettings() {
    pdb.destroy();
}

export async function loadSettings() {
    settings = JSON.parse(JSON.stringify(defaultSettings));
    settings._id = getSettingsID();
    // await get()
}

export async function get() {
    await pdb.get(getSettingsID).then(function (settingsDB) {
        settings = settingsDB;
    }).catch(function (err) {
        create();
    });
}

export function copyDefault() {
    settings = {_id: settings._id, _rev: settings._rev, ...defaultSettings};
}

export async function save() {
    await pdb.put(settings).then( settingsDB => {
        settings._rev = settingsDB.rev;
    }).catch( err => {
        console.log(`Can't create settings: ${err}`);
    });
}

function getSettingsID() {
    return `{settings.lesson.number.toString()}.{settings.topic.number.toString()}:{settings.topology.join('-')}.{settings.populationCount.toString()}`;
}

export async function create() {
    settings = JSON.parse(JSON.stringify(defaultSettings));
    settings._id = getSettingsID();

    await pdb.put(settings).then( settingsDB => {
        settings._rev = settingsDB.rev;
    }).catch( err => {
        console.log(`Can't create settings: ${err}`);
    });
}