function pianistCatalog(list) {
    const numberPieces = Number(list.shift())
    list.pop()
    let catalog = {}

    const commands = {
        Add: (piece, composer, key) => {
        return catalog.hasOwnProperty(piece) ? `${piece} is already in the collection!` :
            (catalog[piece] = {piece, composer ,key},
                `${piece} by ${composer} in ${key} added to the collection!`)},

        Remove: (piece) => {
        return catalog[piece] ? (delete catalog[piece], `Successfully removed ${piece}!`)
            : `Invalid operation! ${piece} does not exist in the collection.`},

        ChangeKey: (piece, key) => {
        return catalog.hasOwnProperty(piece) ? (catalog[piece].key = key,
                `Changed the key of ${piece} to ${key}!`)
            : `Invalid operation! ${piece} does not exist in the collection.`}
    }


    list.map((x, index) => {
        const data = x.split('|')

        if (index < numberPieces) {

            catalog[data[0]] = {piece: data[0], composer: data[1],key: data[2]}
        } else {
            console.log(commands[data.shift()](...data))
        }
    })
    Object.values(catalog).forEach((x) => console.log(`${x.piece} -> Composer: ${x.composer}, Key: ${x.key}`))

}



// function pianistCatalog(list) {
//     const numberPieces = Number(list.shift())
//     list.pop()
//     let catalog = {}
//
//     const commands = {
//         Add: (piece, composer, key) => {
//         return catalog.hasOwnProperty(piece) ? `${piece} is already in the collection!` :
//             (catalog[piece] = new Piece(piece, composer, key),
//                 `${piece} by ${composer} in ${key} added to the collection!`)},
//
//         Remove: (piece) => {
//         return catalog[piece] ? (delete catalog[piece], `Successfully removed ${piece}!`)
//             : `Invalid operation! ${piece} does not exist in the collection.`},
//
//         ChangeKey: (piece, key) => {
//         return catalog.hasOwnProperty(piece) ? (catalog[piece].changeKey(key),
//                 `Changed the key of ${piece} to ${key}!`)
//             : `Invalid operation! ${piece} does not exist in the collection.`}
//     }
//
//
//     class Piece {
//         constructor(piece, composer, key) {
//             this.piece = piece
//             this.composer = composer
//             this.key = key
//         }
//
//         changeKey(newKey) {
//             this.key = newKey
//         }
//
//         printInfo() {
//              return`${this.piece} -> Composer: ${this.composer}, Key: ${this.key}`
//         }
//     }
//
//     list.map((x, index) => {
//         const data = x.split('|')
//
//         if (index < numberPieces) {
//
//             catalog[data[0]] = new Piece(...data)
//         } else {
//             console.log(commands[data.shift()](...data))
//         }
//     })
//     Object.values(catalog).forEach((piece) => console.log(piece.printInfo()))
//
// }


pianistCatalog(['3', 'Fur Elise|Beethoven|A Minor', 'Moonlight Sonata|Beethoven|C# Minor', 'Clair de Lune|Debussy|C# Minor', 'Add|Sonata No.2|Chopin|B Minor', 'Add|Hungarian Rhapsody No.2|Liszt|C# Minor', 'Add|Fur Elise|Beethoven|C# Minor', 'Remove|Clair de Lune', 'ChangeKey|Moonlight Sonata|C# Major', 'Stop'])


//
// function pianistCatalog(list) {
//     const numberPieces = Number(list.shift())
//     let catalog = {}
//
//     class Piece {
//         constructor(piece, composer, key) {
//             this.piece = piece
//             this.composer = composer
//             this.key = key
//         }
//
//         changeKey(newKey) {
//             this.key = newKey
//         }
//
//         printInfo() {
//             console.log(`${this.piece} -> Composer: ${this.composer}, Key: ${this.key}`)
//         }
//     }
//
//     list.map((x, index) => {
//         let [CommandOrPiece, pieceOrComposer, composerOrKey, key] = x.split('|')
//
//         if (index < numberPieces) {
//
//             catalog[CommandOrPiece] = new Piece(CommandOrPiece, pieceOrComposer, composerOrKey)
//         } else {
//
//             if (CommandOrPiece === 'Add') {
//
//                 if (catalog.hasOwnProperty(pieceOrComposer)) {
//                     console.log(`${pieceOrComposer} is already in the collection!`)
//                 } else {
//                     catalog[pieceOrComposer] = new Piece(pieceOrComposer, composerOrKey, key)
//                     console.log(`${pieceOrComposer} by ${composerOrKey} in ${key} added to the collection!`)
//                 }
//             } else if (CommandOrPiece === 'Remove') {
//
//                 if (catalog.hasOwnProperty(pieceOrComposer)) {
//                     delete catalog[pieceOrComposer]
//                     console.log(`Successfully removed ${pieceOrComposer}!`)
//                 } else {
//                     console.log(`Invalid operation! ${pieceOrComposer} does not exist in the collection.`)
//                 }
//             } else if (CommandOrPiece === 'ChangeKey') {
//
//                 if (catalog.hasOwnProperty(pieceOrComposer)) {
//                     catalog[pieceOrComposer].changeKey(composerOrKey)
//                     console.log(`Changed the key of ${pieceOrComposer} to ${composerOrKey}!`)
//                 } else {
//                     console.log(`Invalid operation! ${pieceOrComposer} does not exist in the collection.`)
//                 }
//             }
//         }
//     })
//     for (const piece in catalog) {
//         catalog[piece].printInfo()
//     }
//
// }
//
//
// pianistCatalog([
//     '3',
//     'Fur Elise|Beethoven|A Minor',
//     'Moonlight Sonata|Beethoven|C# Minor',
//     'Clair de Lune|Debussy|C# Minor',
//     'Add|Sonata No.2|Chopin|B Minor',
//     'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
//     'Add|Fur Elise|Beethoven|C# Minor',
//     'Remove|Clair de Lune',
//     'ChangeKey|Moonlight Sonata|C# Major',
//     'Stop'
// ])
//
//
//
//
//
//
