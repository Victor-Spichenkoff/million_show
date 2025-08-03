import axios from 'axios';

const baseUrl = 'http://localhost:2006'

const names = ["james", "maria", "john", "a", "bs", "l", "kadshdndsnj", "player_123", "player_one"]

async function createAndPlay(name: string) {
    try {
        const username = name;
        const password = '12345';

        // 1. Cria usuário
        try {
            await axios.post(`${baseUrl}/auth/signup`, {username, password, role: "normal"});
        } catch {
        }


        // 2. Faz login
        const loginRes = await axios.post(`${baseUrl}/auth/signup`, {username, password});
        const token = loginRes.data.token;

        console.log("Logged in: ", name);
        // 3. Começa partida
        // await axios.post(`${baseUrl}/game/start`, {}, {
        //     headers: { Authorization: `Bearer ${token}` }
        // });
        //
        // // 4. Simula acertos ou ações
        // await axios.post(`${baseUrl}/game/answer`, { answer: 'A' }, {
        //     headers: { Authorization: `Bearer ${token}` }
        // });
        //
        // // 5. Finaliza partida
        // await axios.post(`${baseUrl}/game/finish`, {}, {
        //     headers: { Authorization: `Bearer ${token}` }
        // });
        //
        // console.log(`Usuário ${username} jogou uma partida com sucesso.`);
    } catch (err: any) {
        console.error(`Erro com usuário ${name}:`, err.message);
    }
}

// Cria e joga com 10 usuários
(async () => {
    for (let name of names) {
        await createAndPlay(name)
    }
})();
