function solve(list) {
    let bitcoins = 0;
    let dayFirstBitcoin = 0;
    let totalMoney = 0
    let days = 0
    let goldPrice = 67.51
    let bitcoinPrice = 11949.16

    for (let gold of list) {
        days += 1;
        if (days % 3 === 0) {
            gold *= 0.70
        }
        totalMoney += gold * goldPrice
        while (totalMoney >= bitcoinPrice) {
            bitcoins += 1
            totalMoney -= bitcoinPrice
            if (dayFirstBitcoin === 0) {
                dayFirstBitcoin = days
            }
        }
    }
    if (bitcoins) {
        console.log(`Bought bitcoins: ${bitcoins}`)
        console.log(`Day of the first purchased bitcoin: ${dayFirstBitcoin}`)
    } else {
        console.log(`Bought bitcoins: 0`)
    }
    console.log(`Left money: ${totalMoney.toFixed(2)} lv.`)
}


solve([3124.15, 504.212, 2511.124])