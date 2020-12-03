<template>
    <div id="app">
        <Header />
        <table>
            <thead>
                <tr>
                    <th>Validé</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.nomUtilisateur">
                    <td v-if="user.valide" @click="changerValide(user)"><font-awesome-icon icon="check"/></td>
                    <td v-if="!user.valide" @click="changerValide(user)"><font-awesome-icon icon="cross"/></td>
                    <td>{{ user.nom }}</td>
                    <td>{{ user.prenom }}</td>
                    <td>{{ user.email }}</td>
                    <td @click="deleteUser(user)" ><font-awesome-icon icon="cross"/></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Header from '../components/header';

export default {
    data() {
        return {
            users: {}
        }
    },
    components: {
      Header
    },
    methods: {
        async getInfoUser() {
            const info = await this.$http.get(`/user/users`);
            this.users = info.data.users;
        },
        async changerValide(user) {
            try {
                user.valide = !user.valide;
                await this.$http.put(`/user/valide`, user);
            } catch (err) {
                console.log(err);
            }  
        },
        async deleteUser(user) {
            try {
                await this.$http.post(`/user/delete`,user);
                this.getInfoUser();
            } catch (err) {
                console.log(err);
            }
        }
    },
    created() {
        this.getInfoUser();
    },
}
</script>