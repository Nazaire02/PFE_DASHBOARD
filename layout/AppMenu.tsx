/* eslint-disable @next/next/no-img-element */

import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const model: AppMenuItem[] = [
        {
            label: 'Pages',
            items: [
                { label: "Vue d'ensemble", icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Rapports et alertes', icon: 'pi pi-fw pi-check-square', to: '/uikit/table' },
                { label: 'Bilan des transactions', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/input' },
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
