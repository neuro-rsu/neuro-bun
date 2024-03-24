import {NeuralNetwork} from './neuro-net.mjs';
import {settings} from './settings.mjs';

var pdb = new PouchDB('bun');

export let bestBunBrain; // = new NeuralNetwork(settings.currentTopology);

//await createBestBunBrain();

export async function createBestBunBrain() {
    bestBunBrain = new NeuralNetwork(settings.topology);
    bestBunBrain.cost = -Infinity;

    // await pdb.get(settings.topology.join('-')).then(function (bestBunBrainDB) {
    //     bestBunBrain.sections.forEach((item, index) => item.weights = bestBunBrainDB.sections[index].weights);
    //     bestBunBrain.cost = bestBunBrainDB.cost;
    //     // console.log(bestBunBrainDB);
    // }).catch(function (err) {
    //     // console.log(err);
    //     bestBunBrain._id = settings.topology.join('-');
    //     return pdb.put(bestBunBrain);
    // }).catch( err => {
    //     console.log(`Can't add bestBunBrain ${err}`);
    // });
}

export async function clearBestBunBrain() {
    bestBunBrain = new NeuralNetwork(settings.topology);
    bestBunBrain.cost = -Infinity;

    await pdb.get(settings.topology.join('-')).then(bestBunBrainDB => {
        bestBunBrain._id = bestBunBrainDB._id;
        bestBunBrain._rev = bestBunBrainDB._rev;
        return pdb.put(bestBunBrain);
    }).catch( err => {
        console.log(`Can't clear bestBunBrain ${err}`);
    });
}

// export function addBestBunBrain() {
//     pdb.put(bestBunBrain, function callback(err, result) {
//         if (!err) {
//             console.log('Successfully posted a todo!');
//         }
//     });
// }

export async function addBestBunBrain() {
    await pdb.put(bestBunBrain).then( bestBunBrainDB => {
        bestBunBrain._rev = bestBunBrainDB._rev;
        console.log('Successfully add bestBunBrain!');
    }).catch( err => {
        console.log(`Can't add bestBunBrain ${err}`);
    });
}

export async function changeBestBunBrain(bunBrain) {
    if (bunBrain.cost > bestBunBrain.cost) {
        bestBunBrain = bunBrain.clone(bunBrain);
        bestBunBrain.cost = bunBrain.cost;
        // await saveBestBunBrain();
    }
}

async function saveBestBunBrain() {
    await pdb.get(settings.topology.join('-')).then(function (bestBunBrainDB) {
        bestBunBrain._id = bestBunBrainDB._id;
        bestBunBrain._rev = bestBunBrainDB._rev;
        return pdb.put(bestBunBrain);
        //else if return pdb.put(cloud);
    }).catch( (err) => {
        console.log(`Can't save bestBunBrain ${err}`);
    });
}

export async function compactDb() {
    pdb.compact();
}

export async function deleteDb() {
    pdb.destroy().then(function () {
        alert("База данных удалена");
    }).catch(function (err) {
        alert(err);
    })
}

export async function clearDb() {
    pdb.destroy().then( () => "База данных удалена")
    .catch(err => err)
}