function pianistCatalog(list) {
    const numberPieces = Number(list.shift())
    let catalog = {}

    class Piece {
        constructor(piece, composer, key) {
            this.piece = piece
            this.composer = composer
            this.key = key
        }

        changeKey(newKey) {
            this.key = newKey
        }

        printInfo() {
            console.log(`${this.piece} -> Composer: ${this.composer}, Key: ${this.key}`)
        }
    }

    list.map((x, index) => {
        if (index < numberPieces) {
            const [piece, composer, key] = x.split('|')
            catalog[piece] = new Piece(piece, composer, key)
        } else {
            let [command, ...data] = x.split('|')
            if (command === 'Add') {
                const [piece, composer, key] = data
                if (catalog.hasOwnProperty(piece)) {
                    console.log(`${piece} is already in the collection!`)
                } else {
                    catalog[piece] = new Piece(piece, composer, key)
                    console.log(`${piece} by ${composer} in ${key} added to the collection!`)
                }
            } else if (command === 'Remove') {
                const piece = data[0]
                if (catalog.hasOwnProperty(piece)) {
                    delete catalog[piece]
                    console.log(`Successfully removed ${piece}!`)
                } else {
                    console.log(`Invalid operation! ${piece} does not exist in the collection.`)
                }
            } else if (command === 'ChangeKey') {
                const [piece, newKey] = data
                if (catalog.hasOwnProperty(piece)) {
                    catalog[piece].changeKey(newKey)
                    console.log(`Changed the key of ${piece} to ${newKey}!`)
                } else {
                    console.log(`Invalid operation! ${piece} does not exist in the collection.`)
                }
            }
        }
    })
    for (const piece in catalog) {
        catalog[piece].printInfo()
    }

}


pianistCatalog([
    '3',
    'Fur Elise|Beethoven|A Minor',
    'Moonlight Sonata|Beethoven|C# Minor',
    'Clair de Lune|Debussy|C# Minor',
    'Add|Sonata No.2|Chopin|B Minor',
    'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
    'Add|Fur Elise|Beethoven|C# Minor',
    'Remove|Clair de Lune',
    'ChangeKey|Moonlight Sonata|C# Major',
    'Stop'
])



