function solve(list) {
    let output = {}

    list.forEach(item => {
        if (!item.includes(' with email ')) {
            let [courseName, capacity] = item.split(': ')
            if (!output.hasOwnProperty(courseName)) {
                output[courseName] = {}
                output[courseName].capacity = 0
                output[courseName].users = []
            }
            output[courseName].capacity += parseInt(capacity)
        } else {
            let [userName, data] = item.split(' with email ')
            let [email, courseName] = data.split(' joins ')
            if (output.hasOwnProperty(courseName) && output[courseName].capacity > output[courseName].users.length) {
                [userName, credits] = userName.split('[')
                output[courseName].users.push({
                    name: userName, email: email, credits: parseInt(credits.replace(']', ''))
                })
            }
        }
    })

    Object.entries(output)
        .sort(([courseNameA, courseA], [courseNameB, courseB]) => courseB.users.length - courseA.users.length)
        .forEach(([courseName, course]) => {
            console.log(`${courseName}: ${course.capacity - course.users.length} places left`)
            course.users.sort((a, b) => b.credits - a.credits)
                .forEach(({credits, name, email}) => console.log(`--- ${credits}: ${name}, ${email}`))
        })
}


solve(['JavaBasics: 2', 'user1[25] with email user1@user.com joins C#Basics', 'C#Advanced: 3', 'JSCore: 4', 'user2[30] with email user2@user.com joins C#Basics', 'user13[50] with email user13@user.com joins JSCore', 'user1[25] with email user1@user.com joins JSCore', 'user8[18] with email user8@user.com joins C#Advanced', 'user6[85] with email user6@user.com joins JSCore', 'JSCore: 2', 'user11[3] with email user11@user.com joins JavaBasics', 'user45[105] with email user45@user.com joins JSCore', 'user007[20] with email user007@user.com joins JSCore', 'user700[29] with email user700@user.com joins JSCore', 'user900[88] with email user900@user.com joins JSCore'])