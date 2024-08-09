'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { Badge } from 'primereact/badge';
import { getTransactions } from '@/app/api/transaction';

interface Transaction {
    id: number;
    type: string;
    amount: number;
    nameOrig: string;
    oldbalanceOrg: number;
    newbalanceOrig: number;
    nameDest: string;
    oldbalanceDest: number;
    newbalanceDest: number;
    isFraud: string;
    status: 'Fraude' | 'Non fraude' | 'Suspect'; // Nouveau champ pour le statut
}

const MyDataTable = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');


    useEffect(() => {
        // Simuler une récupération des données
        const fetchTransaction = async () => {
            const transaction = await getTransactions(); // Supposons que getTransaction() renvoie une promesse
            console.log(transaction);
            setTransactions(transaction);
            setLoading(false);
        };

        fetchTransaction();
    }, []);

    const clearFilter = () => {
        setGlobalFilterValue('');
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalFilterValue(e.target.value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Effacer" outlined onClick={clearFilter} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher" />
                </span>
            </div>
        );
    };

    const header = renderHeader();

    const statusBodyTemplate = (rowData: Transaction) => {
        let severity: 'success' | 'warning' | 'danger' = 'success';
        if (rowData.isFraud === '1') {
            severity = 'danger';
        } else if (rowData.isFraud === '0') {
            severity = 'success';
        }
        return <Badge value={severity} severity={severity} />;
    };

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Total fraude</span>
                            <div className="text-900 font-medium text-xl">1048574 transactions</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Total non fraude</span>
                            <div className="text-900 font-medium text-xl">86673 transactions</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Total suspect</span>
                            <div className="text-900 font-medium text-xl">7178 transactions</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <DataTable
                        value={transactions}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={10}
                        dataKey="id"
                        loading={loading}
                        emptyMessage="Aucune transaction trouvée."
                        header={header}
                        globalFilterFields={['type', 'amount', 'nameOrig', 'oldbalanceOrg', 'newbalanceOrig', 'nameDest', 'oldbalanceDest', 'newbalanceDest']}
                        filters={{ 'global': { value: globalFilterValue, matchMode: 'contains' } }}
                    >
                        <Column field="type" header="Type" filter filterPlaceholder="Rechercher par type" style={{ minWidth: '12rem' }} />
                        <Column field="amount" header="Montant" filter filterPlaceholder="Rechercher par montant" style={{ minWidth: '12rem' }} body={(rowData) => rowData.amount?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || ''} />
                        <Column field="nameOrig" header="Compte Origine" filter filterPlaceholder="Rechercher par compte origine" style={{ minWidth: '14rem' }} />
                        <Column field="oldbalanceOrg" header="Ancien Solde Origine" filter filterPlaceholder="Rechercher par ancien solde origine" style={{ minWidth: '14rem' }} body={(rowData) => rowData.oldbalanceOrg?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || ''} />
                        <Column field="newbalanceOrig" header="Nouveau Solde Origine" filter filterPlaceholder="Rechercher par nouveau solde origine" style={{ minWidth: '14rem' }} body={(rowData) => rowData.newbalanceOrig?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || ''} />
                        <Column field="nameDest" header="Compte Destination" filter filterPlaceholder="Rechercher par compte destination" style={{ minWidth: '14rem' }} />
                        <Column field="oldbalanceDest" header="Ancien Solde Destination" filter filterPlaceholder="Rechercher par ancien solde destination" style={{ minWidth: '14rem' }} body={(rowData) => rowData.oldbalanceDest?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || ''} />
                        <Column field="newbalanceDest" header="Nouveau Solde Destination" filter filterPlaceholder="Rechercher par nouveau solde destination" style={{ minWidth: '14rem' }} body={(rowData) => rowData.newbalanceDest?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || ''} />
                        <Column header="Statut" body={statusBodyTemplate} style={{ minWidth: '8rem' }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default MyDataTable;
