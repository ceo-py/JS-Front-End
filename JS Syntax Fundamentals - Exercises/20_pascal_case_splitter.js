

function solve(string){
    console.log(string.split(/(?=[A-Z])/).join(', '));
}

solve('SplitMeIfYouCanHaHaYouCantOrYouCan')