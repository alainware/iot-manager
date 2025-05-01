import DeviceTable from "./components/DeviceTable";
import NavBar from "./components/NavBar";

const App = () => {
    return (
        <div className="flex flex-column" style={{ minHeight: '100vh' }}>
            <NavBar />
            <main className="flex-grow-1 p-4">
                <DeviceTable/>
            </main>
        </div>
    );
};

export default App;