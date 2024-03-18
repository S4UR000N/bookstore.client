import Auth from "../components/auth";

export default function Home() {
    return(
        <main>
            <p>lolo</p>
            <p>lolo</p>
            <p>lolo</p>
            <p>cant reach here</p>
            <Auth roles="Admin, Librarian">
                <p>hello admin</p>
            </Auth>
            <Auth roles="Librarian, Customer">
                <p>hello customer</p>
            </Auth>
        </main>
    );
}