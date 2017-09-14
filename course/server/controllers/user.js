async function getUserInfo(ctx) {
    ctx.body = {
        name: 'Chikara Chan',
        gender: 'male',
        age: 20
    }
}

async function login(ctx) {
    ctx.send(null,"login success");
}

async function register(ctx){
    ctx.send(null,"register success");
}

export default {getUserInfo,login,register}
