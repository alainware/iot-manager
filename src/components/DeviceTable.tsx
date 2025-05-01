import {useEffect, useState} from "react";
import {Device} from "../types";
import {authenticate, database, onValue, ref, set} from "../config/firebaseConfig.ts";
import {InputSwitch} from "primereact/inputswitch";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const DeviceTable = () => {
    const [devices, setDevices] = useState<Device[]>([
        {id: 'foco1', name: 'Foco 1', state: false, icon: 'pi pi-lightbulb'},
        {id: 'foco2', name: 'Foco 2', state: false, icon: 'pi pi-lightbulb'},
        {id: 'foco3', name: 'Foco 3', state: false, icon: 'pi pi-lightbulb'}
    ]);

    // Obtener estado inicial desde Firebase
    useEffect(() => {
        authenticate().then(() => {
            const casaRef = ref(database, 'casa');

            const unsubscribe = onValue(casaRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setDevices(prevDevices =>
                        prevDevices.map(device => ({
                            ...device,
                            state: data[device.id] || false
                        }))
                    );
                }
            });
            return () => unsubscribe();
        }).catch(error => {
            console.error("Authentication failed: ", error);
        })
    }, []);

    // Actualizar estado en Firebase
    // Actualizar estado en Firebase
    const handleSwitchChange = (deviceId: string, value: boolean) => {
        setDevices(prevDevices =>
            prevDevices.map(device =>
                device.id === deviceId ? {...device, state: value} : device
            )
        );

        const deviceRef = ref(database, `casa/${deviceId}`);
        set(deviceRef, value);
    };

    // Plantilla para el icono del dispositivo
    const iconTemplate = (rowData: Device) => {
        return <i className={rowData.icon} style={{
            fontSize: '1.5rem',
            color: rowData.state ? 'gold' : 'gray'
        }}/>;
    };

    // Plantilla para el estado del dispositivo
    const statusTemplate = (rowData: Device) => {
        return (
            <span style={{color: rowData.state ? 'green' : 'red'}}>
        {rowData.state ? 'Encendido' : 'Apagado'}
      </span>
        );
    };

    // Plantilla para el botón de control
    const switchTemplate = (rowData: Device) => {
        return (
            <InputSwitch
                checked={rowData.state}
                onChange={(e) => handleSwitchChange(rowData.id, e.value)}
            />
        );
    };

    return (
        <div className="p-4" style={{maxWidth: '1200px', margin: '0 auto'}}>
            <h1 className="text-3xl font-bold mb-6">Control de Dispositivos IoT</h1>

            <div className="card">
                <DataTable
                    value={devices}
                    responsiveLayout="scroll"
                    stripedRows
                    showGridlines
                >
                    <Column field="icon" header="Icono" body={iconTemplate} style={{width: '80px'}}/>
                    <Column field="name" header="Dispositivo" sortable/>
                    <Column field="state" header="Estado" body={statusTemplate} sortable/>
                    <Column header="Acción" body={switchTemplate} style={{width: '100px'}}/>
                </DataTable>
            </div>
        </div>
    );
};
export default DeviceTable;