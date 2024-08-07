'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Transaction {
    id: number;
    type: string;
    amount: number;
    nameOrig: string;
    oldBalanceOrig: number;
    newBalanceOrig: number;
    nameDest: string;
    oldBalanceDest: number;
    newBalanceDest: number;
    userOrig: User; // Utilisateur d'origine
    userDest: User; // Utilisateur destinataire
}

const MyDataTable = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [displayDetail, setDisplayDetail] = useState(false);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

    useEffect(() => {
        // Simuler une récupération des données
        setTimeout(() => {
            const users = [
                { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com' },
                { id: 2, name: 'Marie Curie', email: 'marie.curie@example.com' }
            ];

            setTransactions([
                {
                    id: 1,
                    type: 'Virement',
                    amount: 1500,
                    nameOrig: 'Compte A',
                    oldBalanceOrig: 5000,
                    newBalanceOrig: 3500,
                    nameDest: 'Compte B',
                    oldBalanceDest: 2000,
                    newBalanceDest: 3500,
                    userOrig: users[0],
                    userDest: users[1]
                },
                // Ajoutez d'autres transactions si nécessaire
            ]);
            setLoading(false);
        }, 2000);
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

    const showDetails = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setDisplayDetail(true);
    };

    const hideDetails = () => {
        setDisplayDetail(false);
        setActionType(null);
    };

    const confirmAction = (type: 'approve' | 'reject') => {
        setActionType(type);
        setConfirmationVisible(true);
    };

    const handleConfirm = () => {
        if (selectedTransaction) {
            // Logique pour approuver ou rejeter la transaction
            console.log(`Transaction ${actionType === 'approve' ? 'approuvée' : 'rejetée'}:`, selectedTransaction);
        }
        hideDetails();
        setConfirmationVisible(false);
    };

    const handleCancel = () => {
        setConfirmationVisible(false);
    };

    const header = renderHeader();

    return (
        <div className="grid">
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
                        globalFilterFields={['type', 'amount', 'nameOrig', 'oldBalanceOrig', 'newBalanceOrig', 'nameDest', 'oldBalanceDest', 'newBalanceDest']}
                        filters={{ 'global': { value: globalFilterValue, matchMode: 'contains' } }}
                    >
                        <Column field="type" header="Type" filter filterPlaceholder="Rechercher par type" style={{ minWidth: '12rem' }} />
                        <Column field="amount" header="Montant" filter filterPlaceholder="Rechercher par montant" style={{ minWidth: '12rem' }} body={(rowData) => rowData.amount?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || ''} />
                        <Column field="nameOrig" header="Compte Origine" filter filterPlaceholder="Rechercher par compte origine" style={{ minWidth: '14rem' }} />
                        <Column field="oldBalanceOrig" header="Ancien Solde Origine" filter filterPlaceholder="Rechercher par ancien solde origine" style={{ minWidth: '14rem' }} body={(rowData) => rowData.oldBalanceOrig?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || ''} />
                        <Column field="newBalanceOrig" header="Nouveau Solde Origine" filter filterPlaceholder="Rechercher par nouveau solde origine" style={{ minWidth: '14rem' }} body={(rowData) => rowData.newBalanceOrig?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || ''} />
                        <Column field="nameDest" header="Compte Destination" filter filterPlaceholder="Rechercher par compte destination" style={{ minWidth: '14rem' }} />
                        <Column field="oldBalanceDest" header="Ancien Solde Destination" filter filterPlaceholder="Rechercher par ancien solde destination" style={{ minWidth: '14rem' }} body={(rowData) => rowData.oldBalanceDest?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || ''} />
                        <Column field="newBalanceDest" header="Nouveau Solde Destination" filter filterPlaceholder="Rechercher par nouveau solde destination" style={{ minWidth: '14rem' }} body={(rowData) => rowData.newBalanceDest?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || ''} />
                        <Column
                            body={(rowData) => (
                                <Button
                                    icon="pi pi-info-circle"
                                    label="Détails"
                                    onClick={() => showDetails(rowData)}
                                />
                            )}
                            style={{ minWidth: '8rem' }}
                        />
                    </DataTable>
                </div>
            </div>

            <Dialog
                header="Détails de la Transaction"
                visible={displayDetail}
                style={{ width: '50vw' }}
                footer={
                    <>
                        <Button label="Valider" icon="pi pi-check" onClick={() => confirmAction('approve')} />
                        <Button label="Rejeter" icon="pi pi-times" className="p-button-danger" onClick={() => confirmAction('reject')} />
                    </>
                }
                onHide={hideDetails}
            >
                {selectedTransaction && (
                    <div>
                        <h3>Transaction ID: {selectedTransaction.id}</h3>
                        <p>Type: {selectedTransaction.type}</p>
                        <p>Montant: {selectedTransaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                        <p>Compte Origine: {selectedTransaction.nameOrig}</p>
                        <p>Ancien Solde Origine: {selectedTransaction.oldBalanceOrig.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                        <p>Nouveau Solde Origine: {selectedTransaction.newBalanceOrig.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                        <p>Compte Destination: {selectedTransaction.nameDest}</p>
                        <p>Ancien Solde Destination: {selectedTransaction.oldBalanceDest.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                        <p>Nouveau Solde Destination: {selectedTransaction.newBalanceDest.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                        <h4>Détails de l'utilisateur d'origine:</h4>
                        {selectedTransaction.userOrig ? (
                            <div>
                                <p>Nom: {selectedTransaction.userOrig.name}</p>
                                <p>Email: {selectedTransaction.userOrig.email}</p>
                            </div>
                        ) : (
                            <p>Aucun utilisateur d'origine trouvé</p>
                        )}
                        <h4>Détails de l'utilisateur destinataire:</h4>
                        {selectedTransaction.userDest ? (
                            <div>
                                <p>Nom: {selectedTransaction.userDest.name}</p>
                                <p>Email: {selectedTransaction.userDest.email}</p>
                            </div>
                        ) : (
                            <p>Aucun utilisateur destinataire trouvé</p>
                        )}
                    </div>
                )}
            </Dialog>

            <Dialog
                header="Confirmation"
                visible={confirmationVisible}
                style={{ width: '30vw' }}
                footer={
                    <>
                        <Button label="Annuler" icon="pi pi-times" onClick={handleCancel} />
                        <Button label="Confirmer" icon="pi pi-check" onClick={handleConfirm} />
                    </>
                }
                onHide={handleCancel}
            >
                <p>Êtes-vous sûr de vouloir {actionType === 'approve' ? 'valider' : 'rejeter'} cette transaction ?</p>
            </Dialog>
        </div>
    );
};

export default MyDataTable;
