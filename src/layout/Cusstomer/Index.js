export default function LayoutCustomer({ children }) {
    return (
        <div>
            <header>
                <h1>Header</h1>

            </header>
            <div>

                {children}
            </div>
            <footer>
                <h1>Footer</h1>

            </footer>
        </div>
    );
}