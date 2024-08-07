/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Accueil',
            items: [{ label: "Vue d'ensemble", icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Pages',
            items: [
                { label: 'Rapports et alertes', icon: 'pi pi-fw pi-check-square', to: '/uikit/table' },
                { label: 'Bilan des transactions', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/input' },
                { label: 'Performance du modèle', icon: 'pi pi-fw pi-bookmark', to: '/uikit/input' },
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
