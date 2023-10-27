function solve(list) {
    const song = (typeList, name, time) => {
        return {
            typeList, name, time,
            prinName: (lfSong) => {
                if (typeList === lfSong || lfSong === 'all') {
                    console.log(name)
                }
            }
        }
    }
    list.shift()
    let lfSong = list.pop()
    list.forEach(x => song(...x.split('_')).prinName(lfSong))
}


// function solve(list) {
//     class Song {
//         constructor(typeList, name, time) {
//             this.typeList = typeList;
//             this.name = name;
//             this.time = time;
//         }
//
//         prinName(typeSong) {
//             if (this.typeList === typeSong || lfSong === 'all') {
//                 console.log(this.name)
//             }
//         }
//     }
//
//     let songs = list.shift()
//     let lfSong = list.pop()
//
//     for (let i = 0; i < songs; i++) {
//         let [type, name, time] = list[i].split('_')
//         let song = new Song(type, name, time)
//         song.prinName(lfSong)
//     }
// }

// solve([3,
//     'favourite_DownTown_3:14',
//     'favourite_Kiss_4:16',
//     'favourite_Smooth Criminal_4:01',
//     'favourite'])


// solve([4,
//     'favourite_DownTown_3:14',
//     'listenLater_Andalouse_3:24',
//     'favourite_In To The Night_3:58',
//     'favourite_Live It Up_3:48',
//     'listenLater'])


solve([2, 'like_Replay_3:15', 'ban_Photoshop_3:48', 'all'])