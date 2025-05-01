import { Menubar } from 'primereact/menubar';
import { PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const NavBar = () => {
    const items = [
        {
            label: 'Inicio',
            icon: PrimeIcons.HOME,
            command: () => { window.location.href = '/'; }
        },
        {
            label: 'Dispositivos',
            icon: PrimeIcons.TH_LARGE,
            command: () => { window.location.href = '#devices'; }
        },
        {
            label: 'Configuración',
            icon: PrimeIcons.COG,
            items: [
                {
                    label: 'Preferencias',
                    icon: PrimeIcons.SLIDERS_H
                },
                {
                    label: 'Usuarios',
                    icon: PrimeIcons.USERS
                }
            ]
        }
    ];

    const start = (
        <div className="flex align-items-center">
            <i className={PrimeIcons.WIFI} style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
            <span className="text-xl font-bold">IoT Manager</span>
        </div>
    );

    return (
        <header>
            <Menubar
                model={items}
                start={start}
                className="border-noround-bottom shadow-2"
                style={{
                    borderRadius: '0',
                    borderBottom: '1px solid var(--surface-d)',
                    padding: '0.5rem 2rem'
                }}
            />
        </header>
    );
};

export default NavBar;