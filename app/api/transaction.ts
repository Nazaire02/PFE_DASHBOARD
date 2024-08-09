import axios from 'axios';

export function getFraudulentTransaction() {
    return axios.get('http://localhost:3000/api/transaction/get-fraudulent')
        .then((response: any) => {
            console.log('Données récupérées:', response.data.transactions);
            return response.data.transactions;
        })
        .catch((error: any) => {
            console.error('Erreur lors de la récupération des données:', error);
            throw error; // Optionnel : pour permettre à la fonction appelante de gérer l'erreur
        });
}

export function getTransactions() {
    return axios.get('http://localhost:3000/api/transaction/get')
        .then((response: any) => {
            console.log('Données récupérées:', response.data.transactions);
            return response.data.transactions;
        })
        .catch((error: any) => {
            console.error('Erreur lors de la récupération des données:', error);
            throw error; // Optionnel : pour permettre à la fonction appelante de gérer l'erreur
        });
}

